from sqlalchemy import Column, Integer, String, ForeignKey, Float, Date
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class Team(Base):
    __tablename__ = "teams"
    team_id = Column(Integer, primary_key=True)
    team_name = Column(String)
    description = Column(String)

    users = relationship("User", back_populates="team")
    projects = relationship("Project", back_populates="team")


class User(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    team_id = Column(Integer, ForeignKey("teams.team_id"))

    team = relationship("Team", back_populates="users")


class Project(Base):
    __tablename__ = "projects"
    project_id = Column(Integer, primary_key=True)
    project_name = Column(String)
    description = Column(String)
    team_id = Column(Integer, ForeignKey("teams.team_id"))

    team = relationship("Team", back_populates="projects")
    tasks = relationship("Task", back_populates="project")


class Task(Base):
    __tablename__ = "tasks"
    task_id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey("projects.project_id"))
    assigned_to = Column(Integer, ForeignKey("users.user_id"))
    task_name = Column(String)
    status = Column(String)
    start_date = Column(String)
    due_date = Column(String)
    closed_date = Column(String)
    progress = Column(Float)
    completion_rate = Column(Float)
    priority = Column(String)
    comments = Column(String)

    project = relationship("Project", back_populates="tasks")
