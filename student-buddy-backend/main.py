from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/get-hint")
async def get_hint(request: Request):
    data = await request.json()
    user_code = data.get("code")

    # Generate a mock hint based on keywords
    if "for" in user_code and "range" in user_code:
        hint = "You're using a loop. Make sure to handle edge cases like empty input or early return conditions."
    elif "if" in user_code:
        hint = "Good use of conditionals. Have you considered all possible branches?"
    else:
        hint = "Try breaking the problem down into smaller steps or writing helper functions."

    return {"hint": hint}


