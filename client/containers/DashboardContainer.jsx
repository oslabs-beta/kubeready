import React from 'react';

const DashboardContainer = () => {

  return (
    <div>
      <p>dashboard container</p>
      <iframe 
        title='' 
        src="http://localhost:3000/d/d84d95bb-d3cc-4353-baba-0893b6dc0ba0/my-dashboard?orgId=1&refresh=5s" 
        height="700px" 
        width="700px"
        >
      </iframe>
    </div>
  )
}

export default DashboardContainer;