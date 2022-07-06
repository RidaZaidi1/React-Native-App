import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

function Todo() {

    const [todo, settodo] = useState([])

    const [val, setval] = useState()

    useEffect(async()=>{
        
        const users = await firestore().collection('Todo').doc().get();
        console.log(users)
    },[])

  

    const addTodo = async () => {
        // for (var j = 0; j < data.length; j++) {
        //     todo[j].status = true
        // }
        // console.log(val);

        // var key = database().ref('/Todo').push().key
        // // console.log(key)
        // var obj = {
        //     name: val,
        //     status: true,
        //     key: key
        // }

        // await database().ref('/Todo').child(key).set(obj).then(() => {
        //     console.log("data Added")
        // })

        settodo([...todo, { name: val, status: true }])
        setval(' ')


    }

    const editTodo = (i) => {
        console.log(i)
        for (var j = 0; j < todo.length; j++) {
            todo[j].status = true
        }
        todo[i].status = false;
        settodo([...todo])

    }
    const handlechange = (e, i) => {
        console.log(e)
        todo[i].name = e
        settodo([...todo])

      

    }

    const update = (i) => {
        todo[i].status = true;
        settodo([...todo])
    }

    const deleteTodo = (i) => {

        todo.splice(i, 1)
        settodo([...todo])
        
    }
    console.log(todo)

    return (
        
        <View>
            <ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput value={val} style={{ backgroundColor: 'blue', color: "white", fontSize: 25, width: 70 + "%", margin: 10 }} onChangeText={(e) => setval(e)} />
                    <TouchableOpacity style={{ margin: 10, backgroundColor: 'green', width: 20 + "%" }} onPress={() => addTodo()}>
                        <Text style={{ textAlign: "center", justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingTop: 20 + "%" }}>Add</Text>
                    </TouchableOpacity>
                </View>
                {todo.map((v, i) => {
                    return (
                        <View key={i} style={{ flexDirection: 'row', width: 100 + "%", flexWrap: "wrap" }}>
                            {v.status == true
                                ?
                                <>
                                    <Text style={{ fontSize: 30, paddingLeft: 20 }}>{v.name}</Text>
                                    <TouchableOpacity style={{ margin: 5, marginLeft: 40, backgroundColor: 'grey', width: 20 + "%", height: 40, justifyContent: 'center' }} onPress={() => editTodo(i)}>
                                        <Text style={{ textAlign: "center", justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>EDIT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ margin: 5, backgroundColor: 'red', width: 15 + "%", height: 40, justifyContent: 'center' }} onPress={() => deleteTodo(i)}>
                                        <Text style={{ textAlign: "center", justifyContent: 'center', color: 'white' }} >Delete</Text>
                                    </TouchableOpacity>
                                </>
                                :
                                <>
                                    <TextInput placeholder="Enter Edit Value" style={{ color: 'red', backgroundColor: 'lightgreen', width: 50 + "%", marginLeft: 10 }} value={v.name} onChangeText={(e) => handlechange(e, i)} />
                                    <TouchableOpacity style={{ margin: 10, backgroundColor: 'red', width: 20 + "%", height: 40, justifyContent: 'center' }} onPress={() => update(i)}>
                                        <Text style={{ textAlign: "center", justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >Update</Text>
                                    </TouchableOpacity>
                                </>

                            }


                        </View>
                    )
                })}
            </ScrollView>

        </View>
    )
}

export default Todo;
