$(function () {
    var ignore_slash = function (s) {
        return s.replace(/\//g, "");
    };
    $.getJSON("resources/regulation.json", function (data) {
        $("[name=old-regulation]").empty();
        $("[name=new-regulation]").empty();
        var rule_name_to_url = {};
        for (var _i = 0, _a = data["rules"].reverse(); _i < _a.length; _i++) {
            var item = _a[_i];
            var template = _.template($("#template-regulation-select-option").html());
            var elem = template({
                value: ignore_slash(item.name),
                text: item.name
            });
            $("[name=old-regulation]").append(elem);
            $("[name=new-regulation]").append(elem);
            rule_name_to_url[ignore_slash(item.name)] = item.url;
        }
        var on_regulation_change = function () {
            var old_name = $("[name=old-regulation] option:selected").text();
            var new_name = $("[name=new-regulation] option:selected").text();
            (function () {
                var old_url = rule_name_to_url[ignore_slash(old_name)];
                var new_url = rule_name_to_url[ignore_slash(new_name)];
                var template = _.template($("#template-list-group-item").html());
                var old_li_tag = template({
                    regulation_name: "旧レギュレーション",
                    url: old_url,
                    text: old_name
                });
                var new_li_tag = template({
                    regulation_name: "新レギュレーション",
                    url: new_url,
                    text: new_name
                });
                var wiki_urls = $("#wiki-url");
                wiki_urls.empty();
                wiki_urls.append(new_li_tag).append(old_li_tag);
            })();
            (function () {
                var old_limit = data["limits"][ignore_slash(old_name)];
                var new_limit = data["limits"][ignore_slash(new_name)];
                var addCardItemsWithLabel = function (elem, names, labelName, labelText) {
                    for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
                        var name_1 = names_1[_i];
                        var template = _.template($("#template-card-item-with-label").html());
                        elem.append(template({ cardName: name_1, labelName: labelName, labelText: labelText }));
                    }
                };
                var addCardItems = function (elem, names) {
                    for (var _i = 0, names_2 = names; _i < names_2.length; _i++) {
                        var name_2 = names_2[_i];
                        var template = _.template($("#template-card-item").html());
                        elem.append(template({ cardName: name_2 }));
                    }
                };
                var labels = ["label label-danger", "label label-warning", "label label-info", "label label-success"];
                var old_limit_all = _.union(old_limit["forbidden"], old_limit["one"], old_limit["two"]);
                var new_limit_all = _.union(new_limit["forbidden"], new_limit["one"], new_limit["two"]);
                var forbidden_ul_tag = $("#forbidden");
                forbidden_ul_tag.empty();
                addCardItemsWithLabel(forbidden_ul_tag, _.intersection(old_limit["one"], new_limit["forbidden"]), labels[0], "制限 > 禁止");
                addCardItemsWithLabel(forbidden_ul_tag, _.intersection(old_limit["two"], new_limit["forbidden"]), labels[0], "準制限 > 禁止");
                addCardItemsWithLabel(forbidden_ul_tag, _.difference(new_limit["forbidden"], old_limit_all), labels[0], "無制限 > 禁止");
                addCardItems(forbidden_ul_tag, _.intersection(old_limit["forbidden"], new_limit["forbidden"]));
                var one_ul_tag = $("#one");
                one_ul_tag.empty();
                addCardItemsWithLabel(one_ul_tag, _.intersection(old_limit["forbidden"], new_limit["one"]), labels[3], "禁止 > 制限");
                addCardItemsWithLabel(one_ul_tag, _.intersection(old_limit["two"], new_limit["one"]), labels[1], "準制限 > 制限");
                addCardItemsWithLabel(one_ul_tag, _.difference(new_limit["one"], old_limit_all), labels[1], "無制限 > 制限");
                addCardItems(one_ul_tag, _.intersection(old_limit["one"], new_limit["one"]));
                var two_ul_tag = $("#two");
                two_ul_tag.empty();
                addCardItemsWithLabel(two_ul_tag, _.intersection(old_limit["forbidden"], new_limit["two"]), labels[3], "禁止 > 準制限");
                addCardItemsWithLabel(two_ul_tag, _.intersection(old_limit["one"], new_limit["two"]), labels[3], "制限 > 準制限");
                addCardItemsWithLabel(two_ul_tag, _.difference(new_limit["two"], old_limit_all), labels[2], "無制限 > 準制限");
                addCardItems(two_ul_tag, _.intersection(old_limit["two"], new_limit["two"]));
                var free_ul_tag = $("#free");
                free_ul_tag.empty();
                addCardItemsWithLabel(free_ul_tag, _.difference(old_limit["forbidden"], new_limit_all), labels[3], "禁止 > 制限解除");
                addCardItemsWithLabel(free_ul_tag, _.difference(old_limit["one"], new_limit_all), labels[3], "制限 > 制限解除");
                addCardItemsWithLabel(free_ul_tag, _.difference(old_limit["two"], new_limit_all), labels[3], "準制限 > 制限解除");
            })();
        };
        $("[name=old-regulation]").on("change", on_regulation_change);
        $("[name=new-regulation]").on("change", on_regulation_change);
        $("[name=old-regulation] option:nth-child(2)").prop("selected", true);
        $("[name=new-regulation] option:nth-child(1)").prop("selected", true);
        on_regulation_change();
    });
});
