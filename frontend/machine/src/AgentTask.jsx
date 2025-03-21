import React, { useEffect, useState } from "react";
import axios from "axios"; // ✅ Using axios instead of fetch

const AgentsTaskList = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get("https://agent-management-app.onrender.com/api/agents/with-tasks"); // ✅ Fixed API endpoint
        setAgents(response.data);
      } catch (error) {
        console.error("Error fetching agents:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-[#FFF3EC]">
      <h1 className="text-2xl font-bold mb-4">Agents & Assigned Tasks</h1>
      {loading ? (
        <p>Loading...</p>
      ) : agents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agents.map((agent) => (
            <div key={agent._id} className="p-4 border rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">{agent.name}</h2>
              <p>Email: {agent.email}</p>
              <p>Mobile: {agent.mobile}</p>
              <h3 className="mt-2 font-medium">Assigned Tasks:</h3>
              {agent.tasks?.length > 0 ? (
                <ul className="list-disc pl-4">
                  {agent.tasks.map((task) => (
                    <li key={task._id}>
                      {task.firstName} - {task.notes}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No assigned tasks</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No agents found</p>
      )}
    </div>
  );
};

export default AgentsTaskList;
