from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from extensions.DBExtensionModel import db

class CountriesSearchBase(db.Model):
    __tablename__ = "country_table"

    id: Mapped[int] = mapped_column(primary_key=True)
    country_name: Mapped[str] = mapped_column(String(64), nullable=False)
    flag_url: Mapped[str] = mapped_column(String(128), nullable=False)
    flag_svg: Mapped[str] = mapped_column(String(128), nullable=False)
