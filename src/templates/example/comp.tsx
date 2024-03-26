import { useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
	Routes,
	Route,
	Link,
	useNavigate,
} from "react-router-dom";

import { 
    motion, 
    AnimatePresence 
} from "framer-motion";

import { Subscription } from "rxjs";
import {observer} from "mobx-react-lite"

// EVERY IMPORT HAS TO BE ../module/file-name
import FallbackRender from "../../utility/ErrorBoundaryFallback";
import { expose_state } from "../../utility/expose-state"; 
import { subscribe_selected_one } from "../../utility/selected-one";


import GFN from '../../g_fn';
import { T_INFO } from "../../types/comp";
import { OBJ_WITH_ID } from "../../types/g-type";
const AS = GFN.AS;



// INJECT IMPORTS HERE
// b@imports








const EN_BROKEN_COMP_LOGS = window.EN_BROKEN_COMP_LOGS || {};




// local code - e.g sub components
// b@locals

const BROKEN_JSX = () => <div className="flex items-center justify-center text-gray-500 font-semibold bg-gray-100">DEFAULT GET_ONE </div>






// b@comp-name
const COMP_NAME = (props: any) => {

	
	// RxJs Subscriptions - to be destroyed on unmount
	const subs = useRef<Subscription[]>([]);



	// FOR IS_MANY
	let idx = props.idx;   // also for protection from error when we might think is many but it's not
	let V = props.V || {}; // for protection from error





	// STATES
	const [M, set_M] 					= useState(props.M || {})
	const [PM, set_PM] 					= useState(props.PM || []); // parent model
	const [selected_M, set_selected_M] 	= useState(null);
	const [errors,				set_errors			]	= useState([]);
	const [warnings,			set_warnings		]	= useState([]);



	// REPLACE INFO HERE - NEXT LINE after b@
	// b@info
	const INFO:T_INFO = { model_id: "", model_name: "", op: "get_many", comp_id: "comp_oneid", comp_idx:idx, set_M:set_M, query: {type: "QP_ID", id: "", qid: ""}};



    // USER DEFINED STATES
    // b@states

	


    // REFS
    // USER DEFINED REFS
    // b@refs





	// QUERY
	// b@query
	const query = {op: "eq", prop_name: "id", prop_value: "{[user].id}"};


	// RELATION
	// b@relation
	let relation:{model_id: string, comp_id: string, prop_name: string}|null = null;






	// EFFECTS FOR GET_ONE
	useEffect(()=>{
		init();

		return () => {
			subs.current.forEach(s=>s.unsubscribe());
		}
	}, []);



	// FROM PARENT
	// useEffect(()=>{
	// 	g_fn.bro_get_one(INFO, set_M, props);
	// }, [props]);



	// SUBS TO SELECTED ONE
	useEffect(()=>subscribe_selected_one(INFO.model_id, subs.current, set_selected_M), []);

	

	// LOGS
	useEffect(()=>{
		if(EN_BROKEN_COMP_LOGS.MODEL_EFFECT){
			const MI = INFO.model_name.toUpperCase() + " : " + INFO.op.toUpperCase();
			console.log("MODEL CHANGED : " + MI + "   => ", "model", M, " props", props);
		}
	}, [M]);






	

    // USER DEFINED EFFECTS
    // b@effects



	// FUNCTIONS

	const set_pre = (M: OBJ_WITH_ID): OBJ_WITH_ID => {
		return M;
	}

	const set_post = (M: OBJ_WITH_ID): OBJ_WITH_ID => {
		return M;
	}



	const init = async ()=>{
		const mid = INFO.model_id;
		const cid = INFO.comp_id;
		if(!mid || !cid) return console.warn("NO MODEL ID OR COMP ID FOUND");


		// remove all previous subscriptions
		subs.current.forEach(s=>s.unsubscribe()); subs.current = [];

		
		// first time
		const E = await GFN.bro_get_one({}, M, INFO, props, idx);
		if(!E || !E.id) return console.warn("ERROR IN GET_ONE", E);
		set_M(set_pre(E));
		// we may not have id so after this we will have id


		// subscription
		subs.current.push(AS.GSTORE.subscribe_one(mid, E.id, (e)=>{
			console.log("USER RE-RENDERED");
			const data = e.data;
			set_M(set_pre(data));
		}));


	}

    // USER DEFINED FUNCTIONS
    // b@functions



	// STATEMENTS
	INFO.set_M          = set_M;
	INFO.on_created     = props.on_created || props.INFO?.on_created;
	INFO.on_selected    = props.on_selected || props.INFO?.on_selected;

    // USER DEFINED STATEMENTS
    // b@statements




	// CONDITIONALS ATTRS
	const COND_ATTRS = {};
	//b@cond-attrs







	// DYNAMIC REACT STATES
	const REACT_STATES: {[name: string]: {state: any, set_state: any, defaultValue?: any}} = {};
    // b@dynamic-states
    // we are also using REACT_STATES to generate some dynamic state from html <state> tag, or from state attr

	expose_state(REACT_STATES, AS, INFO, "M", M, set_M);
    // exposing this will help us in getting this data for debuging purpose



	// MAPPED DATA
	// b@mapped-data


	// USER CODE - Extra code written by user
	// b@user-code

	// b@user-code-end




	return (
		<ErrorBoundary fallbackRender={FallbackRender} onReset={(d) => { console.error(d) }}>
            <BROKEN_JSX />
		</ErrorBoundary>
	)
}

export default observer(COMP_NAME);