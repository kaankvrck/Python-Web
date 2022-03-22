from flask import Flask, jsonify, request, send_file, render_template, redirect, url_for
from flask_socketio import SocketIO, emit

app = Flask(__name__, template_folder="venv\Templates" , static_folder="static")
app.config['DEBUG'] = True
socketio = SocketIO(app)


@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        user = request.form.get('user')
        if user != "":
            return render_template("chat.html", user=user)
    return render_template("base.html")


@socketio.on('joined_room')
def handle_new_connection(user):
    emit('joined_announcement', user, broadcast=True)


@socketio.on('new_message')
def handle_new_message(data):
    emit('broadcast_message', data, broadcast=True)


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0")
