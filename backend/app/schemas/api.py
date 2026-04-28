from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, EmailStr, Field


class LeadCreate(BaseModel):
    full_name: str = Field(min_length=3, max_length=120)
    company: str = Field(default="", max_length=120)
    position: str = Field(default="", max_length=120)
    email: EmailStr
    phone: str = Field(default="", max_length=30)
    company_type: str = Field(default="Empresa")
    solution_interest: str = Field(min_length=3, max_length=80)
    main_need: str = Field(min_length=10, max_length=240)
    budget_range: str = Field(default="Sin definir", max_length=80)
    implementation_time: str = Field(default="Sin definir", max_length=80)
    challenge_description: str = Field(min_length=10, max_length=1000)
    preferred_contact_method: Literal["whatsapp", "email", "call", "videocall"]
    preferred_responsible: Literal["Arturo", "Isa", "Pendiente"] = "Pendiente"
    source: str = Field(default="landing")
    honeypot: str = Field(default="")


class LeadResponse(BaseModel):
    id: int
    full_name: str
    company: str
    email: EmailStr
    solution_interest: str
    lead_score: int
    lead_classification: str
    bot_risk: int
    assigned_to: str
    status: str
    created_at: str


class NewsletterSubscribe(BaseModel):
    email: EmailStr
    name: str = ""
    company: str = ""
    source: str = "landing_newsletter"


class NewsletterResponse(BaseModel):
    id: int
    email: EmailStr
    status: str
    created_at: str


class AppointmentCreate(BaseModel):
    lead_id: int | None = None
    title: str = Field(min_length=3, max_length=120)
    appointment_type: Literal["call", "videocall", "demo"]
    responsible: Literal["Arturo", "Isa"]
    start_datetime: datetime
    end_datetime: datetime
    notes: str = Field(default="", max_length=500)


class AppointmentResponse(BaseModel):
    id: int
    lead_id: int | None
    title: str
    appointment_type: str
    responsible: str
    status: str
    is_video_call: bool
    video_link_status: str
    start_datetime: str
    end_datetime: str


class NewsItem(BaseModel):
    id: int
    title: str
    slug: str
    summary: str
    content: str
    category: str
    published_at: str


class DashboardSummary(BaseModel):
    total_leads: int
    hot_leads: int
    medium_leads: int
    curious_leads: int
    suspicious_bots: int
    today_calls: int
    requested_demos: int
    most_requested_solution: str
