from sanic import Sanic

app = Sanic("rasa_core_no_api")

# Your routes or other configuration here

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5005)
