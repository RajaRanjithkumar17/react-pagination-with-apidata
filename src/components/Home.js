import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import "./Hom.css"




const Home = () => {

  const [useapi, setapi] = useState([]);
  const [useapicurrent, setcurrentPage] = useState(1);
  const [perpages, settodosPerPage] = useState(10);

  const indexOfLastTodo = useapicurrent * perpages;
  const indexOfFirstTodo = indexOfLastTodo - perpages;
  const currentTodos = useapi.slice(indexOfFirstTodo, indexOfLastTodo);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(useapi.length / perpages); i++) {
    pageNumbers.push(i);
  }

  const fetchapiData = async () => {
    const apiData = await axios.get("https://api.spacexdata.com/v3/launches");
    setapi(apiData?.data);
  };

  useEffect(() => {
    fetchapiData();
  }, []);

  console.log(useapi);

  const handlePageChange = (pageNumbers) => {
    setcurrentPage(pageNumbers);
  };

  return (
    <div className="rocakt_api">
      <h1>Rockets</h1>
      
      {currentTodos?.map((item, index) => {
        return (
          <div key={index} className="styl">
            <Card sx={{ maxWidth: 345 }} className="cardstyle">
              <CardHeader title={item.mission_name} subheader={item.details} />
              <CardMedia component="img"    height="194" image={item.links.mission_patch}  
                alt={item.launch_site.site_id} />
            
              <CardContent>
                <Box sx={{ "& button": { m: 2 } }}>
                  <Button variant="outlined"   size="small"  
                    href={item.links.wikipedia} > wikipedia</Button>
                  <Button  variant="outlined" size="small"   href={item.links.video_link}>video_link</Button>
                </Box>
              </CardContent>
            </Card>
          </div>
        );
      })}

    {
      pageNumbers.map((item,index)=>{
        return(
         <div key={index}>
           <Stack spacing={4}>
          <Pagination count={item} color="primary" onChange={()=>handlePageChange(item)} />
        </Stack>
         </div>
        )
      })
    }
    </div>
  );
};

export default Home;
