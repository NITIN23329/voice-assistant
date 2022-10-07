from random import vonmisesvariate
from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
import requests
from requests.auth import HTTPBasicAuth
import json
  
# Making a get request
search_recipe_default_url = "https://cosylab.iiitd.edu.in/api/recipeDB/searchrecipe";
get_token_url = "https://cosylab.iiitd.edu.in/api/auth/realms/bootadmin/protocol/openid-connect/token";
token_data = {
    "client_id": "app-ims",
    "grant_type": "password",
    "username": "manas",
	"password": "manas_cosylab",
	"scope": "openid"
}
def getRequestFromRecipeDBBackEnd(encryptedText):
	response = None;
	print("encrypted text is = {}".format(encryptedText));
	if encryptedText.find("india")!=-1:
		if encryptedText.find("onion")!=-1:
			if(encryptedText.find("ginger")==-1):#country India with onion case
				print("I am in Country India with vegetable Onion Case");
				token = requests.post(url = get_token_url,data = token_data)
				print("Token fetched from recipeDB is = {} ".format(token.json()["access_token"]));
				hydration_call_headers = {'Authorization': 'Bearer ' + token.json()["access_token"]}
				
				tempResponse = requests.get(url=search_recipe_default_url,params = {"country":"Indian","ingredientUsed":"onion"},
					headers = hydration_call_headers);
				# print("The response is = {} ".format(response))
				json_data = json.loads(tempResponse.text);
				# print("Response is getting served = {}".format(json_data))
				print("The length of json_data is = {}".format(len(json_data)))
				final_json_serializable_response = {}
				count = 1;
				for ij in json_data:
					final_json_serializable_response[count-1] = ij;
					count+=1;
				response = final_json_serializable_response
			elif (encryptedText.find("ginger")!=-1):
				index = encryptedText.find("ginger");
				ind2 = encryptedText[:index].find("no")
				if(ind2>=index-5):#country india with onion and no ginger
					print("I am in Country India with vegetable Onion and no ginger Case");
					token = requests.post(url = get_token_url,data = token_data)
					print("Token fetched from recipeDB is = {} ".format(token.json()["access_token"]));
					hydration_call_headers = {'Authorization': 'Bearer ' + token.json()["access_token"]}
					
					tempResponse = requests.get(url=search_recipe_default_url,params = {"country":"Indian","ingredientUsed":"onion","ingredientNotUsed":"ginger"},
						headers = hydration_call_headers);
					# print("The response is = {} ".format(response))
					json_data = json.loads(tempResponse.text);
					# print("Response is getting served = {}".format(json_data))
					print("The length of json_data is = {}".format(len(json_data)))
					final_json_serializable_response = {}
					count = 1;
					for ij in json_data:
						final_json_serializable_response[count-1] = ij;
						count+=1;
					response = final_json_serializable_response
		else:#Only country case
			print("I am in Country India with vegetable");
			token = requests.post(url = get_token_url,data = token_data)
			print("Token fetched from recipeDB is = {} ".format(token.json()["access_token"]));
			hydration_call_headers = {'Authorization': 'Bearer ' + token.json()["access_token"]}
			
			tempResponse = requests.get(url=search_recipe_default_url,params = {"country":"Indian"},
				headers = hydration_call_headers);
			# print("The response is = {} ".format(response))
			json_data = json.loads(tempResponse.text);
			# print("Response is getting served = {}".format(json_data))
			print("The length of json_data is = {}".format(len(json_data)))
			final_json_serializable_response = {}
			count = 1;
			for ij in json_data:
				final_json_serializable_response[count-1] = ij;
				count+=1;
			response = final_json_serializable_response
	return response;
class VoiceAssistant(Resource):
	def get(self,text):
		return getRequestFromRecipeDBBackEnd(text);
app = Flask(__name__)
api = Api(app)
# voice_assistant_put_args = reqparse.RequestParser()
# voice_assistant_put_args.add_argument("text",type = str,help = "Encrypted text")
api.add_resource(VoiceAssistant,"/helloworld/<string:text>")
mapQueryToEndPoint = {}
if __name__ == "__main__":
	app.run(debug=True)
