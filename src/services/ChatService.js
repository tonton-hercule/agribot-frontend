import http from "./http";

class ChatService {
    index(){
        return http.get("/api/liste/message");
    }

    store(data){
        return http.post("/api/store/message", data);
    }

}

export default new ChatService();
