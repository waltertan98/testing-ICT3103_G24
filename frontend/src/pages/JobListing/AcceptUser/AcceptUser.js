import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from 'services/api';
import { EmployerAuthContext } from "../../../contexts/EmployerAuthContext";
function AcceptUser() {
  const { jobId } = useParams();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const { employerAuthState } = useContext(EmployerAuthContext);
  useEffect(() => {
    // Use axios to get job listing details
    api
      .get(`joblisting/job-listings/${jobId}`)
      .then((response) => {
        setUsers(response.data.appliedUsers);
      })
      .catch((error) => {
        console.error("There was an error fetching the job details!", error);
      });
  }, [jobId]);

  const handleAcceptUser = () => {
    // Use axios to accept a user for a job listing
    api
      .put(
        `joblisting/job-listings/${jobId}/accept-user/${selectedUser}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("User accepted for the job");
      })
      .catch((error) => {
        console.error(
          "There was an error accepting the user for the job!",
          error
        );
      });
  };
  if (!employerAuthState) {
    return (
      <div>
        <h1>Not logged in</h1>
      </div>
    );
  }

  return (
    <div>
      <h2>Accept User for Job</h2>
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.firstName} {user.lastName}
          </option>
        ))}
      </select>
      <button onClick={handleAcceptUser}>Accept User</button>
    </div>
  );
}

export default AcceptUser;
