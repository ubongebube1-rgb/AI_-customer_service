import random
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# --- SUB-AI 1: THE RESEARCHER (Knowledge Base) ---
# Simulates searching a database or Google for answers
def research_sub_query(topic):
    print(f"[Researcher Sub] Analyzing data for: {topic}...")
    
    # Simulated Business Data (Small Business/Boutique)
    knowledge_base = {
        "shipping": "We offer free shipping on orders over $50. Standard shipping takes 3-5 business days.",
        "return": "Returns are accepted within 30 days of purchase with original tags attached.",
        "hours": "Our boutique is open from 9 AM to 8 PM, Monday through Saturday.",
        "price": "Our tops range from $20 to $50, and dresses start at $60.",
        "location": "We are located at 123 Fashion Ave, right next to the coffee shop."
    }
    
    # Check if keyword exists in our data
    for key, value in knowledge_base.items():
        if key in topic.lower():
            return value
    return "I might need to check with a manager on that specific detail, but generally, we follow standard boutique policies."

# --- SUB-AI 2: THE INTERFACE (The Persona) ---
# Manages the identity (Name) and keeps the conversation focused.
class InterfaceSub:
    def __init__(self):
        self.names = ["Sarah", "James", "Elena", "Marcus", "Jessica", "David"]
        self.current_name = random.choice(self.names)
    
    def maintain_focus(self, user_input):
        # Keywords that are definitely OFF topic
        off_topic_keywords = ["weather", "football", "politics", "cooking", "movie"]
        if any(word in user_input.lower() for word in off_topic_keywords):
            return True 
        return False

# --- THE MAIN AI (The Orchestrator) ---
# Initialize the session
interface_bot = InterfaceSub()

@app.route('/')
def home():
    # New customer = New random agent
    global interface_bot
    interface_bot = InterfaceSub() 
    return render_template('index.html', agent_name=interface_bot.current_name)

@app.route('/process_chat', methods=['POST'])
def process_chat():
    user_input = request.form['user_input']
    response_text = ""

    # 1. Main AI checks if the user is off-topic
    is_off_topic = interface_bot.maintain_focus(user_input)

    # 2. If off-topic, redirect politely
    if is_off_topic:
        response_text = f"That is interesting, but I want to respect your time. Let's get back to helping you with your shopping or order."
    
    # 3. If on-topic, ask Researcher Sub for answers
    else:
        data_found = research_sub_query(user_input)
        response_text = f"{data_found} Is there anything else I can check for you?"

    return jsonify({'response': response_text, 'agent': interface_bot.current_name})

if __name__ == '__main__':
    app.run(debug=True)
