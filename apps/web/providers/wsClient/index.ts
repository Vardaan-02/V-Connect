const token = localStorage.getItem('__Pearl_Token');
export const WS_URL = `ws://localhost:8080?token=${token}`;