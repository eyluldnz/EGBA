import React,{Component} from 'react';
import {EducationPage} from '../Components/EducationPage';
import {MarketPage} from '../Components/MarketPage';
import { Container } from '@material-ui/core';
import {NavBar} from '../Components/Nav.js';
import { AddEducation } from './AddEducation';


export class HomePage extends Component {

    render = () => {

        return (
            <div>
                <div className="float-xl-left w-100 p-3">
                     <NavBar/>
                </div>
                
                <Container>
                
                   
               
              <div className="float-xl-left w-50 p-3">
                  <EducationPage />
              </div>
                
           <div className="float-xl-left w-50 p-3">
                <MarketPage />
           </div>
           
            </Container>
            
            </div>
           
            
        
           
        )
    }
}