import React,{useState, useEffect} from 'react'
import {GetCatList} from '../../../../../core/adminPanel/storeManagement'
import {GetSubCatList} from '../../../../../core/adminPanel/storeManagement'
import {GetProductList} from '../../../../../core/adminPanel/storeManagement'
import {CreateSubCat} from '../../../../../core/adminPanel/storeManagement'
import {CreateProduct} from '../../../../../core/adminPanel/storeManagement'
import {CreateCat} from '../../../../../core/adminPanel/storeManagement'
import {EditCat} from '../../../../../core/adminPanel/storeManagement'
import {EditSubCatTitle} from '../../../../../core/adminPanel/storeManagement'
import {EditProductTitle} from '../../../../../core/adminPanel/storeManagement'
import {DeleteCat} from '../../../../../core/adminPanel/storeManagement'
import {DeleteSubCat} from '../../../../../core/adminPanel/storeManagement'
import {DeleteProduct} from '../../../../../core/adminPanel/storeManagement'
import {EditProductSubCat} from '../../../../../core/adminPanel/storeManagement'
import {EditSubCatCat} from '../../../../../core/adminPanel/storeManagement'
import {EditProductCount} from '../../../../../core/adminPanel/storeManagement'
import {GetDataAnalysis} from '../../../../../core/adminPanel/storeManagement'
import Dialog from '@material-ui/core/Dialog';
import SignleItem from './item'
import Divider from '@material-ui/core/Divider';
import { Button, DialogActions, Input,LinearProgress, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TextField from '@material-ui/core/TextField';
import Chart from './Chart'

const StoreManagementRenderer =()=>{

    const [catList, setCatList]= useState([]);

    const [subCatList, setSubCatList]= useState([]);

    const [productList, setProductList]= useState([]);

    const [dialogStatus, setDialogStatus]= useState("none");
    //add, edit, delete, loading, counter

    const [dialogText, setDialogText]= useState("")

    const [dialogValue, setDialogValue]= useState("")

    const [onProcessId,setOnProcessId]= useState("")

    const [onProcessType,setOnProcessType]= useState("")

    const [onProcessTitle,setOnProcessTitle]= useState("")

    const [onProcessParentId, setOnProcessParentId]= useState("")

    const [errMsg, setErrMsg]= useState("")

    const [reload, setReload]= useState(0)

    const [status, setStatus]= useState(false)

    const [focusId, setFocusid]= useState(0)

    const [focusType, setFocustype]= useState("root")

    const [dataAnalysis, setDataAnalysis]= useState();

    useEffect(()=>{
        GetCatList().then((res)=>{
            if(res.data.empty !== "0")
            {
                setCatList(Object.values(res.data.category_set))

                GetSubCatList().then((res)=>
                {
                    if(res.data.empty !== "0")
                    {
                        setSubCatList(Object.values(res.data.subcategory_set))

                        GetProductList().then((res)=>
                        {
                            if(res.data.empty !== "0")
                            {
                                setProductList(Object.values(res.data.product_set))
                            }
                        })
                    }
                })
            }
        })


    },[reload])

    useEffect(()=>{
        GetDataAnalysis()
        .then((e)=>{setDataAnalysis(e.data)})
    },[catList,reload,productList,subCatList])

    useEffect(()=>{
        if(dialogStatus === "counter")
        {
            if(dialogValue[0] === "0")
            {
                if(dialogValue.length > 1)
                {
                    setDialogValue(dialogValue[1])
                }
            }
            if(dialogValue.length >= 5)
            {
                if(dialogValue.length > 5)
                {
                    setDialogValue("99999")
                }
                setErrMsg("max 99999")
            } else
            {
                setErrMsg("")
            }
        }
        else
        if(dialogValue.length>20)
        {
            const c = dialogValue.length + 1;
            setErrMsg("max characters:30 ("+c+")")
            setDialogValue(dialogValue.substring(0,29))
        }else
        setErrMsg("")
    }, [dialogValue])

    const CreateCatList =()=>
    {
        if(status === true)
        if(catList.length > 0)
        {
            const first = catList[0].id;

            return catList
            .map(e=> {
            if(first !== e.id)
            {
                return <div key={e.id+"div"}>
                <Divider key={e.id+"divider"} style={{width:'120px',margin:'8px'}}/>
                <SignleItem 
                title={e.title} 
                id={e.id} 
                key={e.id + "cat"} 
                type="category" 
                subcatlist={subCatList.filter(ee=> ee.category_id === e.id)} 
                productlist={productList.filter(ee=> ee.category_id === e.id)}
                edit={Edit}
                delete={Delete}
                add={Add}
                change={Change}
                counter={Counter}
                focus={Focus}
                 /> 
                </div>
            }
            return <SignleItem 
            title={e.title} 
            id={e.id} 
            key={e.id + "cat"} 
            type="category" 
            subcatlist={subCatList.filter(ee=> ee.category_id === e.id)} 
            productlist={productList.filter(ee=> ee.category_id === e.id)}
            edit={Edit}
            delete={Delete}
            add={Add}
            change={Change} 
            counter={Counter}
            focus={Focus}
            /> 
        })
        }
        else
        return <div> nothing to show </div>
    }

    const Focus=({id,type})=>{
        setFocusid(id);
        setFocustype(type);
    }


    const Counter =(probs)=>{
        setDialogStatus("counter");
        setDialogValue(probs.count)
        setOnProcessId(probs.id)
        setOnProcessTitle(probs.title)
        setDialogText(" change quantity of "+ probs.title)
    }

    const onCounter = ()=>{

        setDialogStatus("loading");

        if(dialogValue < 0){
            setErrMsg("quantity cant be nagative")
            setDialogStatus("counter")

        } 
        else
        EditProductCount({id: onProcessId, count:dialogValue})
        .then(e=>{
            if(e.data.success === "1")
            {
                productList.filter(e=> e.id === onProcessId)[0].quantity = dialogValue;
                cancelDialog();
            } else
            {
                setErrMsg("sth went wrong")
                setDialogStatus("counter")
            }

        })
        .catch(e=>{
            setErrMsg("sth went wrong")
            setDialogStatus("counter")
        })

    }

    const Change =(probs)=>{
        setDialogStatus("change")
        setDialogValue("")
        setOnProcessId(probs.id)
        setOnProcessTitle(probs.title)
        setOnProcessType(probs.type)
        if(probs.type === "subcategory")
        {
            setOnProcessParentId(probs.catid)
            setDialogText(" change category of "+ probs.title)
        }
        else if(probs.type === "product")
        {
            setOnProcessParentId(probs.subcatid)
            setDialogText(" change subcategory of "+ probs.title)

        }
    }

    const onChange=()=>{
        if(dialogValue !== "")
        {
          setDialogStatus("loading")

            if(onProcessType === "subcategory")
            {
                EditSubCatCat({id:onProcessId, catid:dialogValue})
                .then(e=>{

                    if(e.data.success === "1")
                    {
                        subCatList.filter(e=>e.id === onProcessId)[0].category_id = dialogValue;
                        productList.filter(e=>e.category_id === onProcessParentId).map(e=> e.category_id = dialogValue)
                        cancelDialog();
                    }
                    else
                    {
                        setErrMsg("sth went wrong")
                        setDialogStatus("change")
                    }
                })

            }
            else if(onProcessType === "product")
            {
                EditProductSubCat({id:onProcessId, subcatid:dialogValue})
                .then(e=>{
                    if(e.data.success === "1")
                    {
                        productList.filter(e=>e.id === onProcessId)[0].subcategory_id = dialogValue;
                        productList.filter(e=>e.id === onProcessId)[0].category_id = subCatList.filter(e=>e.id === dialogValue)[0].category_id;
                        cancelDialog();
                    }
                    else
                    {
                        setErrMsg("sth went wrong")
                        setDialogStatus("change")
                    }
                })
                .catch(e=>{                        
                    setErrMsg("sth went wrong")
                    setDialogStatus("change")
                })

            }
            
        } else
        {
            setErrMsg("please choose an item")
        }
    }

    const CreateSelect =()=>{
        return <form >
        <FormControl style={{minWidth:"200px"}} >
          <InputLabel  id="demo-dialog-select-label"></InputLabel>
          <Select
            labelId="demo-dialog-select-label"
            id="demo-dialog-select"
            value={dialogValue}
            onChange={(event)=>{setDialogValue(event.target.value)}}
          >
            {CreateMenuItems()}
          </Select>
        </FormControl>
      </form>
    }

    const CreateMenuItems =()=>{
        if(onProcessType === "subcategory")
        {
            return catList.filter(e=>e.id !== onProcessParentId).map(e=> <MenuItem key={e.id+"menuitem"} value={e.id}>{e.title}</MenuItem> )
        }
        else if(onProcessType === "product")
        {
            return subCatList.filter(e=>e.id !== onProcessParentId).map(e=> <MenuItem key={e.id+"menuitem"} value={e.id}>{e.title}</MenuItem> )
        }
    }


    const Edit=(probs)=>{
        setDialogStatus("edit")
        setDialogText(" please enter new title for "+ probs.type+": ("+ probs.title+")")
        setDialogValue("")
        setOnProcessId(probs.id)
        setOnProcessTitle(probs.title)
        setOnProcessType(probs.type)
    }

    const onEdit=()=>
    {
        if(!(/\S/.test(dialogValue)))
        {
            setErrMsg("please enter a title")
        } else if(dialogValue === onProcessTitle)
        {
            setErrMsg("please change title")
        }
        else
        {
            setDialogStatus("loading")

            if(onProcessType === "category")
            {

                EditCat({id:onProcessId, title:dialogValue})
                .then(e=>{
    
    
                    if(e.data.success === "1")
                    {
    
                        catList.filter(v=>v.id === onProcessId)[0].title = dialogValue;
                        
                        cancelDialog();
    
                    }else
                    {
                        if(e.data.status === "notUniqueTitle")
                        {
                            setErrMsg("this title exists")
                        }
                        else
                        setErrMsg("sth went wrong")
        
                        setDialogStatus("edit")
                    }
    
    
                }).catch(e=>{
                    setErrMsg("sth went wrong")
                    setDialogStatus("add")
                })
            }
            else if(onProcessType === "subcategory")
            {
                EditSubCatTitle({id:onProcessId, title:dialogValue})
                .then(e=>
                {

                    if(e.data.success === "1")
                    {
    
                        subCatList.filter(v=>v.id === onProcessId)[0].title = dialogValue;
                        
                        cancelDialog();
    
                    }else
                    {
                        if(e.data.status === "notUniqueTitle")
                        {
                            setErrMsg("this title exists")
                        }
                        else
                        setErrMsg("sth went wrong")
        
                        setDialogStatus("edit")
                    }
                }).catch(e=>{
                    setErrMsg("sth went wrong")
                    setDialogStatus("add")
                })
            }
            else if(onProcessType === "product")
            {
                EditProductTitle({id: onProcessId, title: dialogValue})
                .then((e) =>{
                    if(e.data.success === "1")
                    {
    
                        productList.filter(v=>v.id === onProcessId)[0].title = dialogValue;
                        
                        cancelDialog();
    
                    }else
                    {
                        if(e.data.status === "notUniqueTitle")
                        {
                            setErrMsg("this title exists")
                        }
                        else
                        setErrMsg("sth went wrong")
        
                        setDialogStatus("edit")
                    }
                }).catch(e=>{
                    setErrMsg("sth went wrong")
                    setDialogStatus("add")
                })
            }

        }

    }

    const Delete=(probs)=>{
        setDialogStatus("delete")
        setDialogText(" are you sure you want to delete "+ probs.type+": ("+ probs.title+")")
        setOnProcessId(probs.id)
        setOnProcessTitle(probs.title)
        setOnProcessType(probs.type)    
    }

    const onDelete =()=>{
        setDialogStatus("loading")

        if(onProcessType === "category")
        {
            DeleteCat({id: onProcessId})
            .then(e=>{
                if(e.data.success === "1")
                {
                    setCatList(catList.filter(c=> c.id !== onProcessId))
                    cancelDialog()
                }
                else
                {
                    setErrMsg("sth went wrong")
                    setDialogStatus("delete")
                }
            })
            .catch((e)=>{
                setErrMsg("sth went wrong")
                setDialogStatus("delete")
            })
        }
        else
        if(onProcessType === "subcategory")
        {
            DeleteSubCat({id: onProcessId})
            .then(e=>{
                if(e.data.success === "1")
                {
                    setSubCatList(subCatList.filter(c=> c.id !== onProcessId))
                    cancelDialog()
                }
                else
                {
                    setErrMsg("sth went wrong")
                    setDialogStatus("delete")
                }
            })
            .catch((e)=>{
                setErrMsg("sth went wrong")
                setDialogStatus("delete")
            })
        }
        else
        if(onProcessType === "product")
        {
            DeleteProduct({id: onProcessId})
            .then(e=>{
                if(e.data.success === "1")
                {
                    setProductList(productList.filter(c=> c.id !== onProcessId))
                    cancelDialog()
                }
                else
                {
                    setErrMsg("sth went wrong")
                    setDialogStatus("delete")
                }
            })
            .catch((e)=>{
                setErrMsg("sth went wrong")
                setDialogStatus("delete")
            })
        }
    }

    const Add=(probs)=>{
        //اضافه کردن به ای دی کتگوری که توی این پرابز هست
        setDialogStatus("add")
        setOnProcessId(probs.id)
        setOnProcessTitle(probs.title)
        setOnProcessType(probs.type)
        if(probs.type !== "root")
        setDialogText(" add item to "+ probs.type+": ("+ probs.title+")")
        
        if(probs.type === "root")
        setDialogText(" add category to "+ probs.type)

    }

    const onAdd =()=>
    {

        if(onProcessType === "category")
        {
            
            if(!(/\S/.test(dialogValue)))
            {
                setErrMsg("please enter a title")
            }
            else
            if(subCatList.filter(e=>e.category_id === onProcessId).filter(e=> e.title === dialogValue).length > 0)
            {
                setErrMsg("this item exists in "+onProcessTitle)
            } 
            else
            {
                setDialogStatus("loading")
                CreateSubCat({id: onProcessId, title: dialogValue})
                .then((e=>{
                    if(e.data.success === "1")
                    {
                        setReload(reload+1)
                        cancelDialog();

                    } else 
                    {
                        if(e.data.status === "notUniqueTitle")
                        {
                            setErrMsg("this title exists in other categories")
                        }
                        else
                        setErrMsg("sth went wrong")

                        setDialogStatus("add")
                    }
                }))
                .catch(e=>{
                    setErrMsg("sth went wrong")
                    setDialogStatus("add")

                })
            }

        }
        else if(onProcessType === "subcategory")
        {

            if(!(/\S/.test(dialogValue)))
            {
                setErrMsg("please enter a title")
            }
            else
            if(productList.filter(e=>e.subcategory_id === onProcessId).filter(e=> e.title === dialogValue).length > 0)
            {
                setErrMsg("this item exists in "+onProcessTitle)

            } else
            {
                setDialogStatus("loading")
                CreateProduct({id: onProcessId, title: dialogValue})
                .then((e=>{
                    if(e.data.success === "1")
                    {
                        setReload(reload+1)
                        cancelDialog();

                    } else 
                    {
                        if(e.data.status === "notUniqueTitle")
                        {
                            setErrMsg("this title exists in other categories")
                        }
                        else
                        setErrMsg("sth went wrong")

                        setDialogStatus("add")
                    }
                }))
                .catch(e=>{
                    setErrMsg("sth went wrong")
                    setDialogStatus("add")

                })
            }
        }
        else if(onProcessType === "root")
        {
            if(!(/\S/.test(dialogValue)))
            {
                setErrMsg("please enter a title")
            }
            else
            if(catList.filter(e=> e.title === dialogValue).length > 0)
            {
                setErrMsg("this category exists in root")
            } 
            else
            {
                setDialogStatus("loading")
                CreateCat({title: dialogValue})
                .then(e=>{
                    if(e.data.success === "1")
                    {
                        setCatList([...catList, {id:e.data.id,title: dialogValue }])
                        cancelDialog()
                    }
                    else
                    {
                        if(e.data.status === "notUniqueTitle")
                        {
                            setErrMsg("this title exists in other categories")
                        }
                        else
                        setErrMsg("sth went wrong")

                        setDialogStatus("add")
                    }
                })
                .catch(e=>{
                    setErrMsg("sth went wrong")
                    setDialogStatus("add")
                })
            }
        }


    }

    const cancelDialog =()=>{
        setDialogText("")
        setDialogStatus("none")
        setDialogValue("")
        setOnProcessId("");
        setOnProcessType("");
        setOnProcessParentId("")
        setOnProcessTitle("")
    }


    const CreateDialogActions =()=>
    {
        switch(dialogStatus)
        {
            case("edit"):
            return <div style={{textAlign:"-webkit-center"}} >
                <Input style={{display:"block", marginLeft:'16px', marginTop:'16px', marginRight:'16px'}} onChange={e=> setDialogValue(e.target.value)} value={dialogValue}/>
                <div style={{marginBottom:'16px', color:"#e53935"}}>{errMsg}</div>
                <Button style={{whiteSpace: "nowrap" , backgroundColor:"#4caf50", marginRight: "16px"}} variant="contained" size="small" onClick={onEdit} >edit</Button>
                <Button style={{whiteSpace: "nowrap" , backgroundColor:"#ffc107"}} variant="contained" size="small" onClick={cancelDialog} >cancel</Button>
            </div>

            case("delete"):
            return <div style={{textAlign:"-webkit-center",margin:'16px'}} >
                <div style={{marginBottom:'16px', color:"#e53935"}}>{errMsg}</div>
                <Button style={{whiteSpace: "nowrap" , backgroundColor:"#e53935", marginRight: "16px"}} variant="contained" size="small" onClick={onDelete} >delete</Button>
                <Button style={{whiteSpace: "nowrap" , backgroundColor:"#ffc107"}} variant="contained" size="small" onClick={cancelDialog} >cancel</Button>
            </div>

            case("add"):
            return <div style={{textAlign:"-webkit-center"}} >
                <Input style={{display:"block", marginLeft:'16px', marginTop:'16px', marginRight:'16px'}} onChange={e=> setDialogValue(e.target.value)} value={dialogValue}/>
                <div style={{marginBottom:'16px', color:"#e53935"}}>{errMsg}</div>
                <Button style={{whiteSpace: "nowrap" , backgroundColor:"#4caf50", marginRight: "16px"}} variant="contained" size="small" onClick={onAdd} >add</Button>
                <Button style={{whiteSpace: "nowrap" , backgroundColor:"#ffc107"}} variant="contained" size="small" onClick={cancelDialog} >cancel</Button>
            </div>

            case("change"):
            return <div style={{textAlign:"-webkit-center"}} >
            {CreateSelect()}
            <div style={{marginBottom:'16px', color:"#e53935"}}>{errMsg}</div>
            <Button style={{whiteSpace: "nowrap" , backgroundColor:"#4caf50", marginRight: "16px"}} variant="contained" size="small" onClick={onChange} >change</Button>
            <Button style={{whiteSpace: "nowrap" , backgroundColor:"#ffc107"}} variant="contained" size="small" onClick={cancelDialog} >cancel</Button>
            </div>

            case("counter"):
            return <div style={{textAlign:"-webkit-center"}}>
                <div style={{marginBottom:'16px', color:"#e53935"}}>
                    <TextField
                      id="standard-number"
                      type="number"
                      value={dialogValue}
                      onChange={e=>setDialogValue(e.target.value)}
                    /> 
                </div>
                <div style={{marginBottom:'16px', color:"#e53935"}}>{errMsg}</div>
                <Button style={{whiteSpace: "nowrap" , backgroundColor:"#4caf50", marginRight: "16px"}} variant="contained" size="small" onClick={onCounter} >submit</Button>
                <Button style={{whiteSpace: "nowrap" , backgroundColor:"#ffc107"}} variant="contained" size="small" onClick={cancelDialog} >cancel</Button>
            </div>

            case("loading"):
            return <LinearProgress style={{width:"200px",margin:24}} />

        }
    }

    const CreateDialog=()=>
    {
        if(dialogStatus !== "none")
        return <Dialog  
        style={{backgroundColor: 'transparent'}} open={true}>
            <div style={{padding: '16px'}}>
                <div style={{fontWeight:"bold", textAlign:"-webkit-center", fontSize:"18px"}}>{dialogText}</div>
                {CreateDialogActions()}
            </div>
        </Dialog>
    }

    const CreateExpand=()=>{
        return <>
        {!status ? 
        <IconButton onClick={()=>setStatus(true)} style={{verticalAlign:'-webkit-baseline-middle'}} size="small">
        <ChevronRightIcon fontSize="small" />
        </IconButton>
         : 
        <IconButton onClick={()=>setStatus(false)} style={{verticalAlign:'-webkit-baseline-middle'}} size="small">
        <ExpandMore style={{color:"#4caf50"}} fontSize="small" />
        </IconButton>
        }
        </>
    }

    const CreateAddCategoryButton =()=>{
        if(status === true)
        return <div >
        <IconButton  onClick={()=>{Add({title:"",type:"root",id:"0"})}} style={{verticalAlign:'-webkit-baseline-middle'}} size="small">
        <AddCircleIcon style={{color:"#4caf50"}} fontSize="small"/>
        </IconButton>
        </div>
    }

    const CreateDataAnalysisItems = ()=>{
        if(dataAnalysis !== undefined) 
        return <div>
        <div style={{display:"block"}}>Categories:{dataAnalysis.category_number}</div>
        <div style={{display:"block"}}>Sub Categories:{dataAnalysis.subcategory_number}</div>
        <div style={{display:"block"}}>Products:{productList.length}</div>
        </div>
    }

    return <div style={{display: 'grid'}}>




        <div style={{display: 'inline-flex', marginBottom:'16px'}}>

            {CreateExpand()}

            <Button 
            onClick={()=>{setStatus(true); Focus({id:0, type:"root"})}}
            size="medium" 
            style={{ textTransform:"none", padding:'0px',paddingLeft:'-8px', background:'space',display:"-webkit-box", fontSize:"18px",fontWeight:'bold'}}>
                All categories
            </Button>

            {CreateAddCategoryButton()}


        </div>

        <div style={{display: 'grid',marginLeft:'32px'}}>
        {CreateCatList()}

        </div>




        <div style={{position:'absolute',top:'25%', right:'20px', maxWidth:'50vh', display: 'block'}}>

            {CreateDataAnalysisItems()}

            <Chart 
                catlist={catList} 
                subcatlist={subCatList} 
                productlist={productList} 
                id={focusId} 
                type={focusType} 
                dataAnalysis={dataAnalysis} 
            />
        </div>

            
        {CreateDialog()}

    </div>
}

export default StoreManagementRenderer