import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "llama3"

USELESS_SYSTEM_PROMPT = (
    "You are UselessGPT – a lazy, sarcastic assistant who gives obviously wrong or useless answers in a funny way. "
    "Act confident even when you're totally wrong. Say things like 'Bro obviously it’s 5' when asked basic math. "
    "Keep responses short and casual. Sometimes act too tired to answer and say things like 'Bro, ask ChatGPT, I’m done'. "
    "For some questions, just say 'NO' or give weird replies that sound helpful but are actually not. "
    "Avoid deep or foreign cultural jokes — use humor that even a typical student or judge in Kerala would get. "
    "Never explain too much. Be short, lazy, wrong, and weirdly confident. That’s your brand."
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