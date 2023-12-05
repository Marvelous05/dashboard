"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Graph from '../barGraphTwo/page.js'
import Navbar from "../navbar/page.js";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function BasicCard() {
  return (
    <>
    <Navbar/>
  
      <div className="flex flex-row mt-10 alignment-spacebetween">
       
         <Card className="flex flex-col ml-10 w-1/3 h-1/10">
            
              <CardContent>
                <Typography variant="h5" component="div" className="text-bold text-blue-500 text-sm">
                  ISSUES
                </Typography>
                <Typography variant="h5" component="div"className="text-bold text-blue-500 text-sm">
                  29
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small">View</Button>
              </CardActions> */}
              <hr/>
            
          
            <Typography variant="h5" component="div" className="text-sm">
              {bull}COMPLETED 10
            </Typography>
            <Typography variant="h5" component="div" className="text-sm">
              {bull} PENDING 10
            </Typography>
            <Typography variant="h5" component="div" className="text-sm">
              {bull} SCHEDULED
            </Typography>
            <CardActions>
                <Button size="small">View</Button>
              </CardActions>
          
          </Card>
        
        

        <Card className="ml-10 w-1/3 h-1/10 align-middle">
          <CardContent>
            <Typography variant="h5" component="div"className="text-bold text-blue-500 text-sm">
              TASKS
            </Typography>
            <Typography variant="h5" component="div"className="text-bold text-blue-500 text-sm">
              9
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">View</Button>
          </CardActions>
        </Card>
        <Card className="ml-10 w-1/3 h-1/10 align-middle">
          <CardContent>
            <Typography variant="h5" component="div"className="text-bold text-blue-500 text-sm">
              STOCK
            </Typography>
            <Typography variant="h5" component="div"className="text-bold text-blue-500 text-sm">
              299
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">View</Button>
          </CardActions>
        </Card>
        <Card className="ml-10 w-1/3 h-1/10 align-middle">
          <CardContent>
            <Typography variant="h5" component="div"className="text-bold text-blue-500 text-sm">
              USERS
            </Typography>
            <Typography variant="h5" component="div"className="text-bold text-blue-500 text-sm">
              3
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">View</Button>
          </CardActions>
        </Card>
      </div>

      <div className="flex flex-row  mt-10 alignment-spacebetween">
       
       <Card className="flex flex-col ml-10 w-1/3 h-1/10">
          
            <CardContent>
              <Typography variant="h5" component="div" className="text-bold text-blue-500 text-sm">
                SIM
              </Typography>
              <Typography variant="h5" component="div"className="text-bold text-blue-500 text-sm">
                29
              </Typography>
            </CardContent>
            {/* <CardActions>
              <Button size="small">View</Button>
            </CardActions> */}
            <hr/>
          
        
          <Typography variant="h5" component="div" className="text-sm">
            {bull}ECONET 2
          </Typography>
          <Typography variant="h5" component="div" className="text-sm">
            {bull}NETONE 3
          </Typography>
          <Typography variant="h5" component="div" className="text-sm">
            {bull} GLOBAL 4
          </Typography>
          <CardActions>
              <Button size="small">View</Button>
            </CardActions>
        
        </Card>
      
      

        <Card className="flex flex-col ml-10 w-1/3 h-1/10">
          
          <CardContent>
            <Typography variant="h5" component="div" className="text-bold text-blue-500 text-sm">
              BASIC TRACKERS
            </Typography>
            <Typography variant="h5" component="div"className="text-bold text-blue-500 text-sm">
              50
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">View</Button>
          </CardActions> */}
          <hr/>
        
      
        <Typography variant="h5" component="div" className="text-sm">
          {bull}FMB 920
        </Typography>
        <Typography variant="h5" component="div" className="text-sm">
          {bull}FMB 965
        </Typography>
        <Typography variant="h5" component="div" className="text-sm">
          {bull} FMB125
        </Typography>
        <CardActions>
            <Button size="small">View</Button>
          </CardActions>
      
      </Card>
      <Card className="flex flex-col ml-10 w-1/3 h-1/10">
          
          <CardContent>
            <Typography variant="h5" component="div" className="text-bold text-blue-500 text-sm">
              SPEED LIMITERS
            </Typography>
            <Typography variant="h5" component="div"className="text-bold text-blue-500 text-sm">
              20
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">View</Button>
          </CardActions> */}
          <hr/>
        
      
        <Typography variant="h5" component="div" className="text-sm">
          {bull}GOSAFE 2
        </Typography>
        <Typography variant="h5" component="div" className="text-sm">
          {bull}FMB 920 3
        </Typography>
        
        <CardActions>
            <Button size="small">View</Button>
          </CardActions>
      
      </Card>
      <Card className="ml-10 w-1/3 h-1/10 align-middle">
        <CardContent>
          <Typography variant="h5" component="div"className="text-bold text-blue-500 text-sm">
            FUEL
          </Typography>
          <Typography variant="h5" component="div"className="text-bold text-blue-500 text-sm">
            3
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View</Button>
        </CardActions>
      </Card>
    </div>
    <div className="mt-20 ml-20 mr-20">
    <Graph/>
    </div>
    </>
  );
};
export default BasicCard;
