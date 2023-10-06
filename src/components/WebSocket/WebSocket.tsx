"use client";
import React from "react";
import { useEffect } from "react";
import SockJS from "sockjs-client";
// @ts-ignore
import Stomp from "stompjs";
import { toast } from "react-toastify";
import { getToken } from "@/auth/auth";

const WebSocket = () => {
  type data={
    text:string;
    body:string;
  }
  const show = (message:data) => {
    toast.success(message.text);
  };

  const token = getToken();

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    client.connect({}, function () {
      client.subscribe("/all/messages", function (result:data) {
        show(JSON.parse(result.body));
      });

      const privateSocket = new SockJS(
        "http://localhost:8080/ws?jwtToken=" + token
      );
      const privateClient = Stomp.over(privateSocket);

      privateClient.connect({}, function () {
        privateClient.subscribe("/user/specific", function (result:data) {
          show(JSON.parse(result.body));
        });
      });
    });
  }, []);

  return <></>;
};

export default WebSocket;
