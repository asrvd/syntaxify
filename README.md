# syntaxify

A chrome extension that explains code blocks in a simple and easy-to-understand way. Your personal code explainer!

## Introduction

As a developer, we often find ourselves struggling with understanding complex code blocks on differnet sites and resources and spend hours trying to debug and understand them. Reading code written by others is a cumbersome task but it doesn't have to be! What if I told you that there is an extension that can explain those code blocks to you in a matter of seconds?

Introducing Syntaxify, a powerful tool that can help you understand complex code blocks in a simple and easy-to-understand way. Syntaxify lets you select code blocks right from the site and then get its explanation in seconds using \[MindsDB\](https://mindsdb.com)'s excellent NLP integrations with OpenAI.

This extension is especially useful for beginners who are just starting out with coding and need some extra help understanding complex concepts. It can also benefit experienced developers who want to save time and speed up their workflow.

Want to learn more about this tool and how it was made? Keep reading!

## Creating the Extension

The extension was made by me from scratch and it was not at all an easy task. Being my first chrome extension, I had to go through a lot of resources and references to create it. The first step to creating this extension is to create an NLP model using \[MindsDB\]().

* Create a free account on \[MindsDB\](https://mindsdb.com) to get access to their cloud dashboard.
    
* Create your OpenAI model using the Editor, you can change the name of columns and model to whatever you want.
    
    ```sql
    CREATE MODEL code_explainer
    PREDICT explanation
    USING
        engine = 'openai',              
        prompt_template = 'provide a concise and easy to understand explanation of the given code block:{{block}}, make sure it can be easily understood even by beginners';
    ```
    
* Once you have created your model, It's time to integrate it with your extension, I made my backend using Flask (Python) and used the \[MindsDB Python SDK\]([https://pypi.org/project/mindsdb-sdk/](https://pypi.org/project/mindsdb-sdk/)) to connect with my MindsDB instance.
    
    We are using Flask to create the API. Firstly, we need to get the URL arguments that contain the code block and then we feed the code block data to our MindsDB model using the Python SDK which returns a DataFrame. The DataFrame contains our code explanation which we can return as response from the API.
    
    ```python
    from flask import Flask, request
    import mindsdb_sdk as mdb
    import urllib.parse
    import dotenv
    
    app = Flask(__name__)
    
    dotenv.load_dotenv()
    
    EMAIL = dotenv.get_key(".env", "EMAIL")
    PASSWORD = dotenv.get_key(".env", "PSWD")
    
    
    def get_explanation(code: str) -> str:
        """Get explanation for a given code
    
        Args:
            code (str): code to get explanation for
    
        Returns:
            str: explanation for the given code
        """
        server = mdb.connect(login=EMAIL, password=PASSWORD)
        project = server.get_project("mindsdb")
    
        # replace double quotes with single quotes
    
        code = code.replace('"', "'")
    
        # // escape single quotes and double quotes and semicolons from code by adding \ before them
    
        escapedCode = code.replace("'", "\\'").replace('"', '\\"').replace(";", "\\;")
    
        q = project.query(
            f"""
            SELECT article, highlights
            FROM cex
            WHERE article = "{escapedCode}"
            USING max_tokens = 1000;
        """
        )
    
        df = q.fetch()
        result = df.iloc[0]["highlights"]
        print(result)
        return result
    
    
    @app.route("/")
    def explainer():
        print(EMAIL, PASSWORD)
        code = request.args.get("code")
        if code:
            decoded_code = urllib.parse.unquote(code)
            return get_explanation(decoded_code)
    
        return "No code provided"
    
    
    if __name__ == "__main__":
        app.run(debug=True)
    ```
    
* Once your backend is ready, you can start building the extension and connect your backend to it, Since the extension code is a bit complex, it would be unnecessary to include it here, but the source code can be seen \[here\](https://github.com/asrvd/syntaxify)
    

## Usage

Here comes the most interesting part, you can use the extension right in your browser and it takes just a few steps.

* Clone the \[Syntaxify GitHub Repository\]() locally using git CLI or downloading it as zip file.
    
* Inside the repository, you would see a `dist` folder. That's the extension that we need to load.
    
* Open Chrome, and then go to the `Settings > Extensions` and enable \*\*Developer Mode\*\*.
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1682844566400/3ab5ffb8-ee2a-4283-8d79-c46b88b3b4f8.png)
    
* Now click on **Load Unpacked** and then select the `dist` folder that we cloned in step 1.
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1682844655074/cce91366-c513-43a2-bf79-b557c26a5be7.png)
    
* Your extension is loaded and ready to use now. Watch this video to learn how to use it!
 
    https://user-images.githubusercontent.com/68690233/235345010-cfd5cd4f-0edd-4b33-be40-4fdae0055529.mp4


## Links

* Extension Repository - https://github.com/asrvd/syntaxify
    
* Backend Repository - [https://github.com/asrvd/stx-backend](https://github.com/asrvd/stx-backend)
    
* MindsDB - https://mindsdb.com
    

## Conclusion

In conclusion, Syntaxify is a game-changing tool that can make the life of developers easier by providing an easy-to-understand explanation of complex code blocks. It can help beginners learn to code faster and more efficiently while also benefiting experienced developers by saving them valuable time and effort. With this extension, you can improve your coding skills, become a more productive developer, and ultimately, create better software.

Thanks a lot \[Hashnode\](https://hashnode.com) and \[MindsDB\](https://mindsdb.com) for giving me this amazing opportunity to work on this project. I learned a lot from this hackathon build.
