import * as React from "react";
import {Animated, TextInput, View, Text, TouchableOpacity} from "react-native"
import {BehaviorSubject} from "rxjs"
import {map} from 'rxjs/operators'
import {ReactNode, useContext, useEffect, useRef, useState} from "react"
import {IPokemon, ITranslateContext} from "../../Interfaces/SharedInterfaces"
import {styles} from './SearchStyles'
import {mainContext} from "../../Context/TranslateContext";
import {ISubject} from "./Interfaces";

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

/**
 * Component de recherche de pokemon sur l'écran secondaire Pokedex
 * @param props
 * @constructor
 */
const Search = (props: ISearchProps) => {
    const context = useContext<ITranslateContext>(mainContext)
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
                    <Text style={{fontWeight: "bold"}}>{context.translation('CountLabel')}: {pokes.length}</Text>
                </View>
                <View style={{
                    position: "relative",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: 30,
                    margin: 5
                }}>
                    <TouchableOpacity onPress={onFilterByCaptured}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{
                                position: "relative",
                                marginRight: 30,
                                color: filterByCaptured ? "#f00" : "#000"
                            }}>{context.translation('FilterLabel')}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                {props.children(pokes, filterByCaptured)}
            </View>
        </View>
    )
}

export default Search
