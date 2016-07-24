interface Rule {
    key: string;
    name: string;
}

interface RegulationSelecterProps {
    rules: Rule[];
    newKey: string;
    oldKey: string;
    onNewKeyChange(newKey: string): void;
    onOldKeyChange(oldKey: string): void;
}

class RegulationSelecter extends React.Component<RegulationSelecterProps, {}> {
    /* https://stackoverflow.com/questions/33256274/typesafe-select-onchange-event-using-reactjs-and-typescript */
    onNewRegulationChange(e: any) {
        this.props.onNewKeyChange(e.target.value);
    }

    onOldRegulationChange(e: any) {
        this.props.onOldKeyChange(e.target.value);
    }

    render() {
        const FormGroup = ReactBootstrap.FormGroup;
        const ControlLabel = ReactBootstrap.ControlLabel;
        const FormControl = ReactBootstrap.FormControl;
        const options = this.props.rules.map((rule) => {
            return (
                <option value={rule.key} key={rule.key}>{rule.name}</option>
            );
        });
        return (
            <form>
                <FormGroup>
                    <ControlLabel>新レギュレーション</ControlLabel>
                    <FormControl
                        componentClass="select"
                        onChange={this.onNewRegulationChange.bind(this) }
                        value={this.props.newKey}>
                        {options}
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>旧レギュレーション</ControlLabel>
                    <FormControl
                        componentClass="select"
                        onChange={this.onOldRegulationChange.bind(this) }
                        value={this.props.oldKey}>
                        {options}
                    </FormControl>
                </FormGroup>
            </form>
        );
    }
}

interface RegulationViewProps {
    newKey: string;
    oldKey: string;
    keyToName: { [index: string]: string };
    keyToUrl: { [index: string]: string };
}

class RegulationView extends React.Component<RegulationViewProps, {}> {
    render() {
        const ListGroup = ReactBootstrap.ListGroup;
        const ListGroupItem = ReactBootstrap.ListGroupItem;
        const newUrl = this.props.keyToUrl[this.props.newKey];
        const newName = this.props.keyToName[this.props.newKey];
        const oldUrl = this.props.keyToUrl[this.props.oldKey];
        const oldName = this.props.keyToName[this.props.oldKey];
        return (
            <ListGroup>
                <ListGroupItem>新レギュレーション：<a href={newUrl}>{newName}</a></ListGroupItem>
                <ListGroupItem>旧レギュレーション：<a href={oldUrl}>{oldName}</a></ListGroupItem>
            </ListGroup>
        );
    }
}

interface CardItemProps {
    cardName: string;
    hasLabel: boolean;
    labelStyle?: string;
    labelText?: string;
}

class CardItem extends React.Component<CardItemProps, {}> {
    render() {
        const Label = ReactBootstrap.Label;
        const ListGroupItem = ReactBootstrap.ListGroupItem;
        if (!this.props.hasLabel) {
            return (
                <ListGroupItem>{this.props.cardName}</ListGroupItem>
            );
        }
        else {
            return (
                <ListGroupItem>
                    <Label bsStyle={this.props.labelStyle}>
                        {this.props.labelText}
                    </Label> {this.props.cardName}
                    {/*  スペースの入れ方に注意 */}
                </ListGroupItem>
            );
        }
    }
}

interface CardListProps {
    cardItems: CardItemProps[];
}

class CardList extends React.Component<CardListProps, {}> {
    render() {
        const ListGroup = ReactBootstrap.ListGroup;
        const cardItems = this.props.cardItems.map((item) => {
            return (
                <CardItem cardName={item.cardName} hasLabel={item.hasLabel}
                    labelStyle={item.labelStyle} labelText={item.labelText}
                    key={item.cardName} />
            );
        });
        return (
            <ListGroup>
                {cardItems}
            </ListGroup>
        );
    }
}

interface CardViewProps {
    newKey: string;
    oldKey: string;
    computeDifference(newKey: string, oldKey: string): {
        forbiddenCardItems: CardItemProps[],
        oneCardItems: CardItemProps[],
        twoCardItems: CardItemProps[],
        freeCardItems: CardItemProps[]
    };
}

class CardView extends React.Component<CardViewProps, {}> {
    render() {
        const difference = this.props.computeDifference(this.props.newKey, this.props.oldKey);
        return (
            <div>
                <div className="panel panel-danger">
                    <div className="panel-heading">禁止カード</div>
                    <CardList cardItems={difference.forbiddenCardItems} />
                </div>
                <div className="panel panel-warning">
                    <div className="panel-heading">制限カード</div>
                    <CardList cardItems={difference.oneCardItems} />
                </div>
                <div className="panel panel-info">
                    <div className="panel-heading">準制限カード</div>
                    <CardList cardItems={difference.twoCardItems} />
                </div>
                <div className="panel panel-success">
                    <div className="panel-heading">制限解除</div>
                    <CardList cardItems={difference.freeCardItems} />
                </div>
            </div>
        );
    }
}

interface JsonFile {
    rules: { name: string, url: string }[];
    limits: { [ruleName: string]: { [limitType: string]: string } };
}

interface AppProps {
    rules: { name: string, url: string }[];
    computeDifference(newKey: string, oldKey: string): {
        forbiddenCardItems: CardItemProps[],
        oneCardItems: CardItemProps[],
        twoCardItems: CardItemProps[],
        freeCardItems: CardItemProps[]
    };
}

interface AppState {
    rules?: Rule[];
    newKey?: string;
    oldKey?: string;
    keyToUrl?: { [index: string]: string };
    keyToName?: { [index: string]: string };
}

class App extends React.Component<AppProps, AppState> {
    constructor(props?: AppProps, context?: any) {
        super(props, context);
        const rules = this.props.rules.reverse();
        const keyToUrl: { [index: string]: string } = {};
        for (const item of rules) {
            keyToUrl[App.ignoreSlash(item.name)] = item.url;
        }
        const keyToName: { [index: string]: string } = {};
        for (const item of rules) {
            keyToName[App.ignoreSlash(item.name)] = item.name;
        }
        const newKey = App.ignoreSlash(rules[0].name);
        const oldKey = App.ignoreSlash(rules[1].name);

        this.state = {
            rules: rules.map((item) => { return { name: item.name, key: App.ignoreSlash(item.name) }; }),
            newKey,
            oldKey,
            keyToUrl,
            keyToName,
        };
    }

    static ignoreSlash(s: string) {
        return s.replace(/\//g, "");
    }

    onNewKeyChange(newKey: string) {
        this.setState({ newKey });
    }

    onOldKeyChange(oldKey: string) {
        this.setState({ oldKey });
    }

    render() {
        return (
            <div className="row">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <RegulationSelecter
                            rules={this.state.rules}
                            newKey={this.state.newKey}
                            oldKey={this.state.oldKey}
                            onNewKeyChange={this.onNewKeyChange.bind(this) }
                            onOldKeyChange={this.onOldKeyChange.bind(this) } />
                    </div>
                </div>
                <div className="panel panel-default">
                    <RegulationView
                        newKey={this.state.newKey}
                        oldKey={this.state.oldKey}
                        keyToName={this.state.keyToName}
                        keyToUrl={this.state.keyToUrl} />
                </div>
                <CardView
                    newKey={this.state.newKey}
                    oldKey={this.state.oldKey}
                    computeDifference={this.props.computeDifference} />
            </div>
        );
    }
}


$.getJSON("resources/regulation.json", (jsonFile: JsonFile) => {
    const computeDifference = (newKey: string, oldKey: string) => {
        const newLimit = jsonFile.limits[newKey];
        const oldLimit = jsonFile.limits[oldKey];

        const styleDanger = "danger";
        const styleWarning = "warning";
        const styleInfo = "info";
        const styleSuccess = "success";
        const oldLimitAll = _.union(oldLimit["forbidden"], oldLimit["one"], oldLimit["two"]);
        const newLimitAll = _.union(newLimit["forbidden"], newLimit["one"], newLimit["two"]);

        const createCardItemProps = (cards: string[], labelStyle: string, labelText: string): CardItemProps[] => {
            return cards.map((card) => {
                return {
                    cardName: card,
                    hasLabel: true,
                    labelStyle,
                    labelText,
                };
            });
        };

        const createCardItemPropsWithoutLabels = (cards: string[]): CardItemProps[] => {
            return cards.map((card) => {
                return {
                    cardName: card,
                    hasLabel: false,
                };
            });
        };

        const oneToForbiddenItems = createCardItemProps(
            _.intersection(oldLimit["one"], newLimit["forbidden"]),
            styleDanger,
            "制限 > 禁止");
        const twoToForbiddenItems = createCardItemProps(
            _.intersection(oldLimit["two"], newLimit["forbidden"]),
            styleDanger,
            "準制限 > 禁止");
        const freeToForbiddenItems = createCardItemProps(
            _.difference(newLimit["forbidden"], oldLimitAll),
            styleDanger,
            "無制限 > 禁止");
        const continuousForbiddenItems = createCardItemPropsWithoutLabels(
            _.intersection(oldLimit["forbidden"], newLimit["forbidden"])
        );
        const forbiddenCardItems = oneToForbiddenItems
            .concat(twoToForbiddenItems)
            .concat(freeToForbiddenItems)
            .concat(continuousForbiddenItems);

        const forbiddenToOneitems = createCardItemProps(
            _.intersection(oldLimit["forbidden"], newLimit["one"]),
            styleSuccess,
            "禁止 > 制限"
        );
        const twoToOneitems = createCardItemProps(
            _.intersection(oldLimit["two"], newLimit["one"]),
            styleWarning,
            "準制限 > 制限"
        );
        const freeToOneitems = createCardItemProps(
            _.difference(newLimit["one"], oldLimitAll),
            styleWarning,
            "無制限 > 制限"
        );
        const continuousOneItems = createCardItemPropsWithoutLabels(
            _.intersection(oldLimit["one"], newLimit["one"])
        );
        const oneCardItems = forbiddenToOneitems
            .concat(twoToOneitems)
            .concat(freeToOneitems)
            .concat(continuousOneItems);

        const forbiddenToTwoItems = createCardItemProps(
            _.intersection(oldLimit["forbidden"], newLimit["two"]),
            styleSuccess,
            "禁止 > 準制限");
        const oneToTwoItems = createCardItemProps(
            _.intersection(oldLimit["one"], newLimit["two"]),
            styleSuccess,
            "制限 > 準制限");
        const freeToTwoItems = createCardItemProps(
            _.difference(newLimit["two"], oldLimitAll),
            styleInfo,
            "無制限 > 準制限");
        const continuousTwoItems = createCardItemPropsWithoutLabels(
            _.intersection(oldLimit["two"], newLimit["two"])
        );
        const twoCardItems = forbiddenToTwoItems
            .concat(oneToTwoItems)
            .concat(freeToTwoItems)
            .concat(continuousTwoItems);

        const forbiddenToFreeItems = createCardItemProps(
            _.difference(oldLimit["forbidden"], newLimitAll),
            styleSuccess,
            "禁止 > 制限解除"
        );
        const oneToFreeItems = createCardItemProps(
            _.difference(oldLimit["one"], newLimitAll),
            styleSuccess,
            "制限 > 制限解除"
        );
        const twoToFreeItems = createCardItemProps(
            _.difference(oldLimit["two"], newLimitAll),
            styleSuccess,
            "準制限 > 制限解除"
        );
        const freeCardItems = forbiddenToFreeItems
            .concat(oneToFreeItems)
            .concat(twoToFreeItems);

        return {
            forbiddenCardItems,
            oneCardItems,
            twoCardItems,
            freeCardItems,
        };
    };

    ReactDOM.render(<App rules={jsonFile.rules} computeDifference={computeDifference} />, document.getElementById("app"));
});
