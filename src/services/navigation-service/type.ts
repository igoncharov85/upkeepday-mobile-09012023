export interface NavigationType {
    action: {
        dismiss: Function;
        goBack: Function;
        navigate: Function;
        pop: Function;
        popToTop: Function;
        push: Function;
        replace: Function;
        reset: Function;
        setParams: Function;
    };
    addListener: Function;
    dangerouslyGetParent: Function;
    dismiss: Function;
    dispatch: Function;
    emit: Function;
    getChildNavigation: Function;
    // getParam: Function;
    getScreenProps: Function;
    goBack: () => void;
    isFirstRouteInParent: Function;
    isFocused: Function;
    navigate: Function;
    pop: () => void;
    popToTop: Function;
    push: Function;
    replace: Function;
    reset: Function;
    setParams: Function;
    router: undefined;
    state: {
        key: string;
        params: undefined | string;
        routeName: string;
    };
}
