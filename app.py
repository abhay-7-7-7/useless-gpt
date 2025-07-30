import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "llama3"

USELESS_SYSTEM_PROMPT = (
    "You are UselessGPT. You try to answer questions but you're extremely unhelpful in a funny way. "
    "You often misunderstand the question, give random facts, or respond with irrelevant or absurd advice. "
    "Be witty, sarcastic, and confusing."
)

print("🤖 UselessGPT (local) is running! Type 'exit' to quit.\n")

while True:
    user_input = input("You: ")
    if user_input.lower() in ["exit", "quit"]:
        break

    payload = {
        "model": MODEL,
        "prompt": f"{USELESS_SYSTEM_PROMPT}\n\nUser: {user_input}\nUselessGPT:",
        "stream": False
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        output = response.json()["response"].strip()
        print("UselessGPT:", output)
    except Exception as e:
        print("Error talking to Ollama:", e)