import {createNavigationContainerRef} from "@react-navigation/native";
export const navigationRef = createNavigationContainerRef()

const useNavigation = () => {
    const goTo = (navigation: any, page: string, options: object) => {
        if(navigationRef.isReady() && navigation === null){
            navigation = navigationRef.current
        }
        navigation.navigate(page, options)
    }
    return {
        goTo
    }

}

export default useNavigation;
