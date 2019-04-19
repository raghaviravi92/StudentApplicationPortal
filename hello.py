from flask import Flask
from flask import jsonify
from flask_cors import CORS
from flask import request
from flask import Response

import psycopg2
import json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

empDB=[
 {
 'id':'101',
 'name':'Saravanan S',
 'title':'Technical Leader'
 },
 {
 'id':'201',
 'name':'Rajkumar P',
 'title':'Sr Software Engineer'
 }
 ]

def getApplicants(university):
	con = psycopg2.connect(database='mydb')
	cur = con.cursor()
	cur.execute("select email, university, dname, program, termofadmission from application where admissionstatus='ACCEPT'")
        columns = ['email','university','dname','program','termofadmission','yearofadmission']
	answers = []
	rows = cur.fetchall()
	for row in rows:
		answers.append(dict(zip(columns,row)))
	con.close()
	result = {"students":answers}
	return json.dumps(result, indent=2)

@app.route("/")
def hello():
	return json.dumps({"message": "Hello World"})

@app.route('/slate/applicationUpdate', methods=['POST'])
def testApp():
	req_data = request.get_json()
	email = req_data['email']
    	con = psycopg2.connect(database='mydb')
    	cur = con.cursor()
	cur.execute ("""UPDATE application SET admissionStatus=%s WHERE email=%s""", ('ACCEPT',email))
    	cur.execute("commit")
    	con.close()
	
	return json.dumps({"Success": "Application Status Updated Successfully"})

@app.route('/empdb/test/<string:university>', methods=['GET'])
def get_Applicants(university):
	if university == "GSU":
		return getApplicants(university)
	else:
		return json.dumps({"error": "Invalid University"})

@app.route('/empdb/employee',methods=['GET'])
def getAllEmp():
    return jsonify({'emps':empDB})

@app.route('/empdb/chh/test',methods=['GET'])
def getTest():
	return json.dumps({"error": "Invalid testcase"})
        return json.dumps({ "error": "Invalid email or password" })

@app.route('/slate/authenticate', methods=['POST'])
def authenticate():
    req_data = request.get_json()
    email = req_data['email']
    password = req_data['password']
    con = psycopg2.connect(database='mydb')
    cur = con.cursor()
    cur.execute('select email, password from applicant where (email=\''+email+'\' or password=\''+password+'\')')/
    columns = ['email', 'password']
    answers = []
    rows = cur.fetchall()
    if cur.rowcount == 0:
	return json.dumps({ "error": "Invalid email or password" })
    for row in rows :
	answers.append(dict(zip(columns,row))) 
    con.close()
    result = {"students":answers} 
    return json.dumps(result)
    
@app.route('/slate/filterApplicantions', methods=['GET'])
def filter_applications():
    con = psycopg2.connect(database='mydb')
    cur = con.cursor()
    cur.execute("select email,university,dname,program,termOfAdmission,yearOfAdmission,admissionStatus from application where admissionStatus='PENDING' and dataSentToPaws='No'")
    columns = ['email', 'university', 'dname', 'program', 'termOfAdmission', 'yearOfAdmission', 'admissionStatus']
    answers = []
    rows = cur.fetchall()
    if cur.rowcount == 0:
        return json.dumps({ "Error": "No More Pending Applicantions Available" })
    for row in rows :
        answers.append(dict(zip(columns,row)))
    con.close()
    result = {"students":answers}
    return json.dumps(result)

@app.route('/register', methods=['POST'])
def json_example():
    req_data = request.get_json()
    fname = req_data['fname']
    lname = req_data['lname']
    email = req_data['email'] 
    addressone = req_data['addressone']
    addresstwo = req_data['addresstwo']
    city = req_data['city']
    state = req_data['state']
    zip = req_data['zip']
    grev = req_data['grev']
    grea = req_data['grea']
    greq = req_data['greq']
    toefl = req_data['toefl']
    password = req_data['password']
    con = psycopg2.connect(database='mydb')
    cur = con.cursor()
    cur.execute("insert into applicant(fname,lname,email,password,address1,address2,GREV,GREQ,GREA,TOEFL,city,state,zip) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",(fname,lname,email,password,addressone,addresstwo,grev,greq,grea,toefl,city,state,zip))
    cur.execute("commit")
    con.close()

    return "Inserted Successfully"

@app.route('/applyForAdmission', methods=['POST'])
def appsubmit():
    req_data = request.get_json()
    email = req_data['email']
    university = req_data['university']
    dname = req_data['dname']
    program = req_data['program']
    dateOfApp = req_data['dateOfApp']
    dateOfApp = dateOfApp[0:10]
    termOfAdmission = req_data['termOfAdmission']
    yearOfAdmission = req_data['yearOfAdmission']
    admissionStatus = req_data['admissionStatus']
    dataSentToPaws = req_data['dataSentToPaws']
    con = psycopg2.connect(database='mydb')
    cur = con.cursor()
    cur.execute("insert into application(email,university,dname,program,dateOfApp,termOfAdmission,yearOfAdmission,admissionStatus,dataSentToPaws) values (%s,%s,%s,%s,%s,%s,%s,%s,%s)",(email,university,dname,program,dateOfApp,termOfAdmission,yearOfAdmission,admissionStatus,dataSentToPaws))
    cur.execute("commit")
    con.close()
    return json.dumps({ "Success": "Application Submitted Successfully" })

@app.route('/register', methods=['OPTIONS'])
def opt_response():
    resp = Response("")
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Headers'] = '*'
    resp.headers['methods-allowed'] = POST, GET, PUT, PATCH, DELETE, OPTIONS
    return resp
	

if __name__ == "__main__":
	app.run()
