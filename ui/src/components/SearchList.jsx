import React from "react";

function SearchList({ searchResults, onSelectUser }) {
  return (
    <div className="flex-1 overflow-y-auto px-2">
      {searchResults.map((result) => (
        <div
          key={result.id}
          className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100"
          onClick={() => onSelectUser(result)} // Gọi hàm khi click
        >
          <div className="ml-3 flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">
              {result.username}
            </p>
            <p className="text-sm text-gray-600 truncate">
              {result.name || result.email}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchList;