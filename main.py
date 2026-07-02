import webview
import json



class PythonAPI:
    def __init__(self):
        json_structure = {
            "app": "ToDo App",
            "task_count": 0,
            "tasks": {
            }
        }
        try:
            with open("task.json", "x") as file:
                json.dump(json_structure, file, indent=2)
        except FileExistsError:
            pass

    def save_task(self, id, title, description, done, created):
        task_structure = {
            "title": title,
            "description":description,
            "done": done,
            "created": created}

        with open("task.json", "r") as file:
            json_structure = json.load(file)
        
        with open("task.json", "w") as file:
            json_structure["tasks"][f"{id}"] = task_structure
            json.dump(json_structure, file, indent=2)


API = PythonAPI()
WINDOW = webview.create_window("TODO App", "./UI/index.html", js_api = API)
webview.start(debug=True)