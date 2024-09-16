import http from "./http";

class ChatService {
    
    store(data){
        return http.post("/ask/", data);
    }

}

export default new ChatService();
