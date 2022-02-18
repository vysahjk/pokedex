import * as React from "react";
import {Animated, TextInput, View, Text} from "react-native"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faListOl, faFilter} from '@fortawesome/free-solid-svg-icons'
import {BehaviorSubject} from "rxjs"
import {map} from 'rxjs/operators'
import {ReactNode, useContext, useEffect, useRef, useState} from "react"
import {IPokemon} from "../../Interfaces/Interfaces"
import {styles} from './SearchStyles'
import {IMainContext, mainContext} from "../../Context/MainContext";

interface ISubject {
    list: Array<IPokemon>
    query: string
}

const searchSubject = new BehaviorSubject<ISubject>({
    list: [],
    query: ""
})
const searchObservable = searchSubject.pipe(
    map(item => {
        let filters = item.list.filter(p => p.name.includes(item.query.toLowerCase()))
        if (filters.length) {
            return {
                list: filters,
                query: item.query
            } as ISubject
        }
        return item
    })
)

type ISearchProps = {
    numberCaptured: number
    listPokemon: Array<IPokemon>
    children: (pokes: Array<IPokemon>, filterByCaptured: boolean) => ReactNode
}
const Search = (props: ISearchProps) => {
    const context = useContext<IMainContext>(mainContext)
    const animationCapturedNumber = useRef(new Animated.Value(1)).current
    const [filterByCaptured, setFilterByCaptured] = useState<boolean>(false)
    const [pokes, setPokes] = useState<Array<IPokemon>>([])

    // Search Pokemon by name
    const [search, setSearch] = useState<string>("")
    const onSearch = (s: string) => {
        searchSubject.next({
            list: props.listPokemon,
            query: s
        })
        setSearch(s)
    }
    useEffect(() => {
        setPokes(props.listPokemon)
    }, [props.listPokemon])
    useEffect(() => {
        const subs = searchObservable.subscribe(result => {
            if (result.list.length)
                setPokes(result.list)
        })
        return () => {
            subs.unsubscribe()
        }
    }, [])

    // Animation number of captured
    useEffect(() => {
        const anim = Animated.timing(
            animationCapturedNumber,
            {
                toValue: 3,
                duration: 100,
                useNativeDriver: false
            }
        )
        anim.start((result) => {
            if(result.finished){
                animationCapturedNumber.setValue(1)
                anim.reset()
            }
        })
    }, [props.numberCaptured])

    // When list is filtered
    const onFilterByCaptured = () => {
        setFilterByCaptured(!filterByCaptured)
        setPokes(prevState => {
            return prevState
        })
    }

    return (
        <View>
            <View>

                <TextInput
                    style={styles.InputText}
                    value={search}
                    onChangeText={onSearch}
                    placeholder={context.translation('SearchPlaceholder')}
                />

                <View style={{position: "relative", paddingLeft: 30, margin: 5}}>
                    <FontAwesomeIcon style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%"
                    }} icon={faListOl}/>
                    <Text style={{fontWeight: "bold"}}>{context.translation('CountLabel')}: {pokes.length}</Text>
                </View>
                <View style={{
                    position: "relative",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: 30,
                    margin: 5
                }}>
                    <FontAwesomeIcon style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%"
                    }} icon={faListOl}/>
                    <View>
                        <Text style={{fontWeight: "bold"}}>{context.translation('CapturedLabel')}: {<Animated.View
                            style={{
                                transform: [{ scale: animationCapturedNumber }],
                            }}>
                            <Text>{props.numberCaptured}</Text>
                        </Animated.View>}</Text>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <Text style={{
                            position: "relative",
                            marginRight: 30,
                            color: filterByCaptured ? "green" : "black"
                        }}>{context.translation('FilterLabel')}</Text>
                        <FontAwesomeIcon style={{
                            position: "absolute",
                            cursor: "pointer",
                            color: filterByCaptured ? "green" : "black",
                            top: 0,
                            right: 0,
                            height: "100%"
                        }} icon={faFilter} onClick={onFilterByCaptured}/>
                    </View>
                </View>
            </View>
            <View>
                {props.children(pokes, filterByCaptured)}
            </View>
        </View>
    )
}

export default Search