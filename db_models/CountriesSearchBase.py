from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from extensions.DBExtensionModel import db

class CountriesSearchBase(db.Model):
    __tablename__ = "country_table"

    id: Mapped[int] = mapped_column(primary_key=True)
    country_name: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    country_code: Mapped[str] = mapped_column(String(128), nullable=False, unique=True)
    official_country_name: Mapped[str] = mapped_column(String(128), nullable=False, unique=True)
    capital: Mapped[str] = mapped_column(String(128), nullable=False, unique=True)
    region: Mapped[str] = mapped_column(String(128), nullable=False, unique=True)
    subregion: Mapped[str] = mapped_column(String(128), nullable=False, unique=True)
    languages: Mapped[str] = mapped_column(String(128), nullable=False, unique=True)
    flag_url: Mapped[str] = mapped_column(String(128), nullable=False, unique=True)
    flag_svg: Mapped[str] = mapped_column(String(128), nullable=False, unique=True)
    arms_flag_png: Mapped[str] = mapped_column(String(128), nullable=False, unique=True)
    arms_flag_svg: Mapped[str] = mapped_column(String(128), nullable=False, unique=True)
    area: Mapped[int] = mapped_column(String(128), nullable=False, unique=True)
    population: Mapped[int] = mapped_column(String(128), nullable=False, unique=True)
