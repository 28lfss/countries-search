from flask import Flask, request, jsonify, render_template

app = Flask(__name__)


@app.route("/")
def search_api():
    """
    Handles the root URL ("/") of the application.

    @return HTML content rendered from the 'index.html' template.
    """
    return render_template('index.html')


@app.route("/details/<code>")
def country_details(code=None):
    """
    Displays country details based on the given code.

    @param code The code representing a specific country, passed as a URL parameter. Defaults to None if not provided.
    @return HTML content rendered from 'details.html', passing the country 'code' as 'details' to the template.
    """
    return render_template('details.html', details=code)