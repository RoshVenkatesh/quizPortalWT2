import sys
sys.path.append('/usr/local/lib/python2.7/dist-packages')
from flask import Flask, redirect, url_for,jsonify,request,flash,abort
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
import os
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'files'
ALLOWED_EXTENSIONS = set(['pdf'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config["MONGO_URI"] = "mongodb://localhost:27017/quizPortal"
mongo = PyMongo(app)

print("HELLO")

if __name__ == '__main__':
    app.run(debug = True)