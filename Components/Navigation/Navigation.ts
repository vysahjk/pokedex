const useNavigation = () => {
    const goTo = (navigation: any, page: string, options: object) => {
        navigation.navigate(page, options)
    }
    return {
        goTo
    }
}

export default useNavigation;