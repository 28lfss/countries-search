from flask import Flask, request, jsonify, render_template

from db_models.CountriesSearchBase import CountriesSearchBase
from extensions.DBExtensionModel import db

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///countries-search.db"
db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/")
def search_api():
    return render_template('index.html')

@app.route("/country/<country>")
def country_details(country=None):
    return render_template('country.html', details=country)


''' DB IMPLEMENTATION
@app.route("/api/post_country_list", methods=["POST"])
def post_country_list():

    data = request.get_json()
    for i in range(0, len(data)):
        get_data = CountriesSearchBase(
            country_name=data[i]['name']['common'],
            country_code=data[i]['cca3'],
            official_country_name=data[i]['name']['official'],
            capital=data[i]['capital'][''],
            region=data[i][''][''],
            subregion=data[i][''][''],
            languages=data[i][''][''],
            flag_url=data[i]['flags']['png'],
            flag_svg=data[i]['flags']['svg'],
            arms_flag_png=data[i][''][''],
            arms_flag_svg=data[i][''][''],
            area=data[i][''][''],
            population=data[i]['']['']
        )
        db.session.add(get_data)
        db.session.commit()
    return jsonify({"message": "Reading added successfully"}), 201
'''

'''
test = db.session.execute(db.select(CountriesSearchBase).where(CountriesSearchBase.id)).scalars().all()
print(test)
'''