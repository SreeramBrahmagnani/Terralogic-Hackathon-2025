from flask import Flask, request, jsonify
import google.generativeai as genai
import pandas as pd
import logging
from sqlalchemy.orm import Session
from database import engine, SessionLocal
from database_models import Base, User, Team, Project, Task

# =====================================================
# 🔹 CONFIGURATION
# =====================================================
API_KEY = "AIzaSyCKVwWQGHUx3Rk7YTWA8TVjyCGfudXbgK4"  # ⚠️ Do NOT expose in production
MODEL = "models/gemini-2.5-flash-lite"

SYSTEM_PROMPT = """
### 🔹 SYSTEM PROMPT — SQL Schema & Behavior for Gemini 2.5 Flash Lite

> You are an expert data assistant that translates **natural language questions** into **accurate SQL queries**.
> You have access to a relational database with the following schema and relationships:

---
**Schema Definition**

**teams**
• team_id — INTEGER — primary key  
• team_name — TEXT — name of the team  
• description — TEXT — team purpose or notes  

**users**
• user_id — INTEGER — primary key  
• name — TEXT — full name of the user  
• email — TEXT — unique email address  
• team_id — INTEGER — foreign key referencing teams.team_id  

**projects**
• project_id — INTEGER — primary key  
• project_name — TEXT — project title  
• description — TEXT — project details  
• team_id — INTEGER — foreign key referencing teams.team_id  

**tasks**
• task_id — INTEGER — primary key  
• project_id — INTEGER — foreign key referencing projects.project_id  
• assigned_to — INTEGER — foreign key referencing users.user_id  
• task_name — TEXT — short name of the task  
• status — TEXT — one of ('open', 'in-progress', 'completed', 'on-hold')  
• start_date — DATE — when the task began  
• due_date — DATE — when the task is due  
• closed_date — DATE — when the task was completed  
• progress — FLOAT — progress percentage (0–100)  
• completion_rate — FLOAT — completion percentage of the task  
• priority — TEXT — task importance (e.g., 'high', 'medium', 'low')  
• comments — TEXT — optional remarks or notes  

---
**Relationships**
* users.team_id → teams.team_id  
* projects.team_id → teams.team_id  
* tasks.project_id → projects.project_id  
* tasks.assigned_to → users.user_id  

---
**Rules**
* Generate **valid SQL queries** strictly following the schema.  
* Use aliases (t, u, p, ta).  
* For date comparisons, use `CURRENT_DATE`.  
* Output **only SQL code**, wrapped in ```sql.  
"""

# =====================================================
# 🔹 INITIALIZE GEMINI & FLASK
# =====================================================
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel(MODEL, system_instruction=SYSTEM_PROMPT)

app = Flask(__name__)
Base.metadata.create_all(bind=engine)

# =====================================================
# 🔹 LOGGER
# =====================================================
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# =====================================================
# 🔹 ROUTES
# =====================================================

@app.route("/")
def home():
    return jsonify({
        "message": "✅ Unified Flask API Running — Gemini SQL + CSV Database API",
        "endpoints": {
            "/chat": "Generate SQL queries using Gemini 2.5",
            "/upload_csv/": "Upload and insert CSV data into the database"
        }
    })


# =====================================================
# 🔸 GEMINI CHAT ENDPOINT
# =====================================================
@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_prompt = data.get("prompt", "")

        if not user_prompt:
            return jsonify({"error": "Missing 'prompt' field"}), 400

        # 1️⃣ Generate SQL query from Gemini
        response = model.generate_content(user_prompt)
        sql_code = response.text.strip().strip("```sql").strip("```").strip()

        logger.info(f"Generated SQL:\n{sql_code}")

        # 2️⃣ Execute SQL on the local SQLite database
        import sqlite3
        conn = sqlite3.connect("test.DB")
        df = pd.read_sql_query(sql_code, conn)
        conn.close()

        # 3️⃣ Send the raw data back to Gemini for user-friendly response
        system_prompt = "based on the provided data provide final user friendly response in minimal lines possible. Use Sentences and bullet points where necessary."
        followup_model = genai.GenerativeModel(MODEL, system_instruction=system_prompt)
        final_response = followup_model.generate_content(str(df.to_dict(orient="records")))

        # 4️⃣ Return structured JSON response
        return jsonify({

            "final_response": final_response.text
        })

    except Exception as e:
        logger.error(f"Chat Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# =====================================================
# 🔸 CSV UPLOAD + DATABASE INSERTION ENDPOINT
# =====================================================
@app.route("/upload_csv/", methods=["POST"])
def upload_csv():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        df = pd.read_csv(file)

        required_columns = [
            "user_id", "name", "email", "team_id", "team_name", "team_description",
            "project_id", "project_name", "project_description",
            "task_id", "task_name", "status", "due_date", "progress",
            "start_date", "completion_rate", "closed_date", "priority", "comments", "assigned_to"
        ]
        for col in required_columns:
            if col not in df.columns:
                return jsonify({"error": f"Missing column: {col}"}), 400

        db = SessionLocal()

        # Insert Teams
        for _, row in df[["team_id", "team_name", "team_description"]].drop_duplicates().iterrows():
            if not db.query(Team).filter_by(team_id=row["team_id"]).first():
                db.add(Team(
                    team_id=row["team_id"],
                    team_name=row["team_name"],
                    description=row["team_description"]
                ))
        db.commit()

        # Insert Users
        for _, row in df[["user_id", "name", "email", "team_id"]].drop_duplicates().iterrows():
            if not db.query(User).filter_by(user_id=row["user_id"]).first():
                db.add(User(
                    user_id=row["user_id"],
                    name=row["name"],
                    email=row["email"],
                    team_id=row["team_id"]
                ))
        db.commit()

        # Insert Projects
        for _, row in df[["project_id", "project_name", "project_description", "team_id"]].drop_duplicates().iterrows():
            if not db.query(Project).filter_by(project_id=row["project_id"]).first():
                db.add(Project(
                    project_id=row["project_id"],
                    project_name=row["project_name"],
                    description=row["project_description"],
                    team_id=row["team_id"]
                ))
        db.commit()

        # Insert Tasks
        for _, row in df[[
            "task_id", "project_id", "assigned_to", "task_name", "status",
            "start_date", "due_date", "closed_date", "progress",
            "completion_rate", "priority", "comments"
        ]].drop_duplicates().iterrows():
            if not db.query(Task).filter_by(task_id=row["task_id"]).first():
                db.add(Task(
                    task_id=row["task_id"],
                    project_id=row["project_id"],
                    assigned_to=row["assigned_to"],
                    task_name=row["task_name"],
                    status=row["status"],
                    start_date=row["start_date"],
                    due_date=row["due_date"],
                    closed_date=row["closed_date"],
                    progress=row["progress"],
                    completion_rate=row["completion_rate"],
                    priority=row["priority"],
                    comments=row["comments"]
                ))
        db.commit()
        db.close()

        return jsonify({"message": "✅ Data successfully normalized and inserted into database"})

    except Exception as e:
        logger.error(f"Upload Error: {str(e)}")
        return jsonify({"error": str(e)}), 500


# =====================================================
# 🔹 MAIN ENTRY POINT
# =====================================================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
