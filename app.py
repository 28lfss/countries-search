from flask import Flask, request, jsonify
from flask import render_template
from db_models import CountriesSearchBase
from db_models.CountriesSearchBase import CountriesSearchBase
from extensions.DBExtensionModel import db

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///countries-search.db"
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/api/post_country_list", methods=["POST"])
def post_country_list():
    data = request.get_json()
    for i in range(0, len(data)):
        test = CountriesSearchBase(
            country_name=data[i]['name']['common'],
            flag_url=data[i]['flags']['png'],
            flag_svg=data[i]['flags']['svg']
        )
        db.session.add(test)
        db.session.commit()
    test_query = CountriesSearchBase.query.all()
    return render_template('post_country_list.html', test_query = test_query)
#    return jsonify({"message": "Reading added successfully"}), 201


@app.route("/")
def search_api():
    return render_template('index.html')

@app.route("/country/<country>")
def country_details(country=None):
    return render_template('country.html', details=country)
