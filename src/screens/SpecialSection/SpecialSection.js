//react components
import React,{useState,useEffect} from "react";
import { 
    View,Text,
    FlatList
} from "react-native";
import Header from "../../components/Header/Header";
//styles
import { styles } from "./SpecialSectionStyle";
//service 
import * as service from "./SpecialSectionService";
import SpecialCard from "../../components/SpecialCard/SpecialCard";

const SpecialSection=()=>{

    //states
	const[moviePart,setMoviePart]=useState([]);

    //function : service function
    const getMovieParts=async()=>{
		try {
			const resp=await service.getMovieParts();
			setMoviePart(resp.data)
		} catch (error) {
			setMoviePart([])
			console.log("error in getMovieParts",error);
		}
	}
    //useEffect
    useEffect(()=>{
        getMovieParts()
    },[])
    return(
        <View style={styles.container}>
            <Header/>
            <View style={{height:10}}/>
            {moviePart
            &&
            moviePart.length>0
            &&
            moviePart.map(
                e=>(
                   <SpecialCard
                   key={e.id}
                   item={e}
                   />
                )
            )
            }
        </View>
    )
}
export default SpecialSection;
