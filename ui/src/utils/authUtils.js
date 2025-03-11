const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  console.log("token: ", token);
  
  return { Authorization: `Bearer ${token}` };
};
export { getAuthHeaders };
