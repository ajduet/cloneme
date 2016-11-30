package com.revature.assignforce.util;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by August Duet on 11/30/2016.
 */
public class HttpSessionCollector implements HttpSessionListener {
    private static final Map<String, HttpSession> sessions = new HashMap<String, HttpSession>();

    @Override
    public void sessionCreated(HttpSessionEvent event) {
        System.out.println("Creating Session");
        HttpSession session = event.getSession();
        sessions.put(session.getId(), session);
        for (HttpSession s : sessions.values()) {
            System.out.println(s.getId());
        }
    }


    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
        System.out.println("Destroying Session");
        sessions.remove(event.getSession().getId());
    }

    public static HttpSession find(String sessionId) {
        System.out.println("search for " + sessionId);
        System.out.println(sessions.size());
        return sessions.get(sessionId);
    }
}
