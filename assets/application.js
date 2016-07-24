var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RegulationSelecter = (function (_super) {
    __extends(RegulationSelecter, _super);
    function RegulationSelecter() {
        _super.apply(this, arguments);
    }
    /* https://stackoverflow.com/questions/33256274/typesafe-select-onchange-event-using-reactjs-and-typescript */
    RegulationSelecter.prototype.onNewRegulationChange = function (e) {
        this.props.onNewKeyChange(e.target.value);
    };
    RegulationSelecter.prototype.onOldRegulationChange = function (e) {
        this.props.onOldKeyChange(e.target.value);
    };
    RegulationSelecter.prototype.render = function () {
        var options = this.props.rules.map(function (rule) {
            return (React.createElement("option", {value: rule.key, key: rule.key}, rule.name));
        });
        return (React.createElement("form", null, React.createElement("div", {className: "form-group"}, React.createElement("label", {htmlFor: "new-regulation"}, "新レギュレーション"), React.createElement("select", {name: "new-regulation", className: "form-control", onChange: this.onNewRegulationChange.bind(this), value: this.props.newKey}, options)), React.createElement("div", {className: "form-group"}, React.createElement("label", {htmlFor: "old-regulation"}, "旧レギュレーション"), React.createElement("select", {name: "old-regulation", className: "form-control", onChange: this.onOldRegulationChange.bind(this), value: this.props.oldKey}, options))));
    };
    return RegulationSelecter;
}(React.Component));
var RegulationView = (function (_super) {
    __extends(RegulationView, _super);
    function RegulationView() {
        _super.apply(this, arguments);
    }
    RegulationView.prototype.render = function () {
        var newUrl = this.props.keyToUrl[this.props.newKey];
        var newName = this.props.keyToName[this.props.newKey];
        var oldUrl = this.props.keyToUrl[this.props.oldKey];
        var oldName = this.props.keyToName[this.props.oldKey];
        return (React.createElement("ul", {className: "list-group"}, React.createElement("li", {className: "list-group-item"}, "新レギュレーション：", React.createElement("a", {href: newUrl}, newName)), React.createElement("li", {className: "list-group-item"}, "旧レギュレーション：", React.createElement("a", {href: oldUrl}, oldName))));
    };
    return RegulationView;
}(React.Component));
var CardItem = (function (_super) {
    __extends(CardItem, _super);
    function CardItem() {
        _super.apply(this, arguments);
    }
    CardItem.prototype.render = function () {
        if (!this.props.hasLabel) {
            return (React.createElement("li", {className: "list-group-item"}, this.props.cardName));
        }
        else {
            return (React.createElement("li", {className: "list-group-item"}, React.createElement("span", {className: this.props.labelClass}, this.props.labelText), " ", this.props.cardName));
        }
    };
    return CardItem;
}(React.Component));
var CardList = (function (_super) {
    __extends(CardList, _super);
    function CardList() {
        _super.apply(this, arguments);
    }
    CardList.prototype.render = function () {
        var cardItems = this.props.cardItems.map(function (item) {
            return (React.createElement(CardItem, {cardName: item.cardName, hasLabel: item.hasLabel, labelClass: item.labelClass, labelText: item.labelText, key: item.cardName}));
        });
        return (React.createElement("ul", {className: "list-group"}, cardItems));
    };
    return CardList;
}(React.Component));
var CardView = (function (_super) {
    __extends(CardView, _super);
    function CardView() {
        _super.apply(this, arguments);
    }
    CardView.prototype.render = function () {
        var difference = this.props.computeDifference(this.props.newKey, this.props.oldKey);
        return (React.createElement("div", null, React.createElement("div", {className: "panel panel-danger"}, React.createElement("div", {className: "panel-heading"}, "禁止カード"), React.createElement(CardList, {cardItems: difference.forbiddenCardItems})), React.createElement("div", {className: "panel panel-warning"}, React.createElement("div", {className: "panel-heading"}, "制限カード"), React.createElement(CardList, {cardItems: difference.oneCardItems})), React.createElement("div", {className: "panel panel-info"}, React.createElement("div", {className: "panel-heading"}, "準制限カード"), React.createElement(CardList, {cardItems: difference.twoCardItems})), React.createElement("div", {className: "panel panel-success"}, React.createElement("div", {className: "panel-heading"}, "制限解除"), React.createElement(CardList, {cardItems: difference.freeCardItems}))));
    };
    return CardView;
}(React.Component));
var App = (function (_super) {
    __extends(App, _super);
    function App(props, context) {
        _super.call(this, props, context);
        var rules = this.props.rules.reverse();
        var keyToUrl = {};
        for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
            var item = rules_1[_i];
            keyToUrl[App.ignoreSlash(item.name)] = item.url;
        }
        var keyToName = {};
        for (var _a = 0, rules_2 = rules; _a < rules_2.length; _a++) {
            var item = rules_2[_a];
            keyToName[App.ignoreSlash(item.name)] = item.name;
        }
        var newKey = App.ignoreSlash(rules[0].name);
        var oldKey = App.ignoreSlash(rules[1].name);
        this.state = {
            rules: rules.map(function (item) { return { name: item.name, key: App.ignoreSlash(item.name) }; }),
            newKey: newKey,
            oldKey: oldKey,
            keyToUrl: keyToUrl,
            keyToName: keyToName
        };
    }
    App.ignoreSlash = function (s) {
        return s.replace(/\//g, "");
    };
    App.prototype.onNewKeyChange = function (newKey) {
        this.setState({ newKey: newKey });
    };
    App.prototype.onOldKeyChange = function (oldKey) {
        this.setState({ oldKey: oldKey });
    };
    App.prototype.render = function () {
        return (React.createElement("div", {className: "row"}, React.createElement("div", {className: "panel panel-default"}, React.createElement("div", {className: "panel-body"}, React.createElement(RegulationSelecter, {rules: this.state.rules, newKey: this.state.newKey, oldKey: this.state.oldKey, onNewKeyChange: this.onNewKeyChange.bind(this), onOldKeyChange: this.onOldKeyChange.bind(this)}))), React.createElement("div", {className: "panel panel-default"}, React.createElement(RegulationView, {newKey: this.state.newKey, oldKey: this.state.oldKey, keyToName: this.state.keyToName, keyToUrl: this.state.keyToUrl})), React.createElement(CardView, {newKey: this.state.newKey, oldKey: this.state.oldKey, computeDifference: this.props.computeDifference})));
    };
    return App;
}(React.Component));
$.getJSON("resources/regulation.json", function (jsonFile) {
    var computeDifference = function (newKey, oldKey) {
        var newLimit = jsonFile.limits[newKey];
        var oldLimit = jsonFile.limits[oldKey];
        var labelDanger = "label label-danger";
        var labelWarning = "label label-warning";
        var labelInfo = "label label-info";
        var labelSuccess = "label label-success";
        var oldLimitAll = _.union(oldLimit["forbidden"], oldLimit["one"], oldLimit["two"]);
        var newLimitAll = _.union(newLimit["forbidden"], newLimit["one"], newLimit["two"]);
        var createCardItemProps = function (cards, labelClass, labelText) {
            return cards.map(function (card) {
                return {
                    cardName: card,
                    hasLabel: true,
                    labelClass: labelClass,
                    labelText: labelText
                };
            });
        };
        var createCardItemPropsWithoutLabels = function (cards) {
            return cards.map(function (card) {
                return {
                    cardName: card,
                    hasLabel: false
                };
            });
        };
        var oneToForbiddenItems = createCardItemProps(_.intersection(oldLimit["one"], newLimit["forbidden"]), labelDanger, "制限 > 禁止");
        var twoToForbiddenItems = createCardItemProps(_.intersection(oldLimit["two"], newLimit["forbidden"]), labelDanger, "準制限 > 禁止");
        var freeToForbiddenItems = createCardItemProps(_.difference(newLimit["forbidden"], oldLimitAll), labelDanger, "無制限 > 禁止");
        var continuousForbiddenItems = createCardItemPropsWithoutLabels(_.intersection(oldLimit["forbidden"], newLimit["forbidden"]));
        var forbiddenCardItems = oneToForbiddenItems
            .concat(twoToForbiddenItems)
            .concat(freeToForbiddenItems)
            .concat(continuousForbiddenItems);
        var forbiddenToOneitems = createCardItemProps(_.intersection(oldLimit["forbidden"], newLimit["one"]), labelSuccess, "禁止 > 制限");
        var twoToOneitems = createCardItemProps(_.intersection(oldLimit["two"], newLimit["one"]), labelWarning, "準制限 > 制限");
        var freeToOneitems = createCardItemProps(_.difference(newLimit["one"], oldLimitAll), labelWarning, "無制限 > 制限");
        var continuousOneItems = createCardItemPropsWithoutLabels(_.intersection(oldLimit["one"], newLimit["one"]));
        var oneCardItems = forbiddenToOneitems
            .concat(twoToOneitems)
            .concat(freeToOneitems)
            .concat(continuousOneItems);
        var forbiddenToTwoItems = createCardItemProps(_.intersection(oldLimit["forbidden"], newLimit["two"]), labelSuccess, "禁止 > 準制限");
        var oneToTwoItems = createCardItemProps(_.intersection(oldLimit["one"], newLimit["two"]), labelSuccess, "制限 > 準制限");
        var freeToTwoItems = createCardItemProps(_.difference(newLimit["two"], oldLimitAll), labelInfo, "無制限 > 準制限");
        var continuousTwoItems = createCardItemPropsWithoutLabels(_.intersection(oldLimit["two"], newLimit["two"]));
        var twoCardItems = forbiddenToTwoItems
            .concat(oneToTwoItems)
            .concat(freeToTwoItems)
            .concat(continuousTwoItems);
        var forbiddenToFreeItems = createCardItemProps(_.difference(oldLimit["forbidden"], newLimitAll), labelSuccess, "禁止 > 制限解除");
        var oneToFreeItems = createCardItemProps(_.difference(oldLimit["one"], newLimitAll), labelSuccess, "制限 > 制限解除");
        var twoToFreeItems = createCardItemProps(_.difference(oldLimit["two"], newLimitAll), labelSuccess, "準制限 > 制限解除");
        var freeCardItems = forbiddenToFreeItems
            .concat(oneToFreeItems)
            .concat(twoToFreeItems);
        return {
            forbiddenCardItems: forbiddenCardItems,
            oneCardItems: oneCardItems,
            twoCardItems: twoCardItems,
            freeCardItems: freeCardItems
        };
    };
    ReactDOM.render(React.createElement(App, {rules: jsonFile.rules, computeDifference: computeDifference}), document.getElementById("app"));
});
