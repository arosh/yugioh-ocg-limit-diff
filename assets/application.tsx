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
        const options = this.props.rules.map((rule) => {
            return (
                <option value={rule.key} key={rule.key}>{rule.name}</option>
            );
        });
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="new-regulation">新レギュレーション</label>
                    <select
                        name="new-regulation"
                        className="form-control"
                        onChange={this.onNewRegulationChange.bind(this) }
                        value={this.props.newKey}>
                        {options}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="old-regulation">旧レギュレーション</label>
                    <select
                        name="old-regulation"
                        className="form-control"
                        onChange={this.onOldRegulationChange.bind(this) }
                        value={this.props.oldKey}>
                        {options}
                    </select>
                </div>
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
        const newUrl = this.props.keyToUrl[this.props.newKey];
        const newName = this.props.keyToName[this.props.newKey];
        const oldUrl = this.props.keyToUrl[this.props.oldKey];
        const oldName = this.props.keyToName[this.props.oldKey];
        return (
            <ul className="list-group">
                <li className="list-group-item">
                    新レギュレーション：<a href={newUrl}>
                        {newName}
                    </a>
                </li>
                <li className="list-group-item">
                    旧レギュレーション：<a href={oldUrl}>
                        {oldName}
                    </a>
                </li>
            </ul>
        );
    }
}

interface CardItemProps {
    cardName: string;
    hasLabel: boolean;
    labelClass?: string;
    labelText?: string;
}

class CardItem extends React.Component<CardItemProps, {}> {
    render() {
        if (!this.props.hasLabel) {
            return (
                <li className="list-group-item">{this.props.cardName}</li>
            );
        }
        else {
            return (
                <li className="list-group-item">
                    <span className={this.props.labelClass}>
                        {this.props.labelText}
                    </span> {this.props.cardName}
                    {/*  スペースの入れ方に注意 */}
                </li>
            );
        }
    }
}

interface CardListProps {
    cardItems: CardItemProps[];
}

class CardList extends React.Component<CardListProps, {}> {
    render() {
        const cardItems = this.props.cardItems.map((item) => {
            return (
                <CardItem cardName={item.cardName} hasLabel={item.hasLabel}
                    labelClass={item.labelClass} labelText={item.labelText}
                    key={item.cardName} />
            );
        });
        return (
            <ul className="list-group">
                {cardItems}
            </ul>
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

        const labelDanger = "label label-danger";
        const labelWarning = "label label-warning";
        const labelInfo = "label label-info";
        const labelSuccess = "label label-success";
        const oldLimitAll = _.union(oldLimit["forbidden"], oldLimit["one"], oldLimit["two"]);
        const newLimitAll = _.union(newLimit["forbidden"], newLimit["one"], newLimit["two"]);

        const createCardItemProps = (cards: string[], labelClass: string, labelText: string): CardItemProps[] => {
            return cards.map((card) => {
                return {
                    cardName: card,
                    hasLabel: true,
                    labelClass,
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
            labelDanger,
            "制限 > 禁止");
        const twoToForbiddenItems = createCardItemProps(
            _.intersection(oldLimit["two"], newLimit["forbidden"]),
            labelDanger,
            "準制限 > 禁止");
        const freeToForbiddenItems = createCardItemProps(
            _.difference(newLimit["forbidden"], oldLimitAll),
            labelDanger,
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
            labelSuccess,
            "禁止 > 制限"
        );
        const twoToOneitems = createCardItemProps(
            _.intersection(oldLimit["two"], newLimit["one"]),
            labelWarning,
            "準制限 > 制限"
        );
        const freeToOneitems = createCardItemProps(
            _.difference(newLimit["one"], oldLimitAll),
            labelWarning,
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
            labelSuccess,
            "禁止 > 準制限");
        const oneToTwoItems = createCardItemProps(
            _.intersection(oldLimit["one"], newLimit["two"]),
            labelSuccess,
            "制限 > 準制限");
        const freeToTwoItems = createCardItemProps(
            _.difference(newLimit["two"], oldLimitAll),
            labelInfo,
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
            labelSuccess,
            "禁止 > 制限解除"
        );
        const oneToFreeItems = createCardItemProps(
            _.difference(oldLimit["one"], newLimitAll),
            labelSuccess,
            "制限 > 制限解除"
        );
        const twoToFreeItems = createCardItemProps(
            _.difference(oldLimit["two"], newLimitAll),
            labelSuccess,
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
