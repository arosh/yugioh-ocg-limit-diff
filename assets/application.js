$(function() {
    var ignore_slash = function(s) {
        return s.replace(/\//g, '');
    };

    $.getJSON("resources/regulation.json", function(data) {
        $("[name=old-regulation]").empty();
        $("[name=new-regulation]").empty();

        var rule_name_to_url = {};

        $.each(data["rules"].reverse(), function(index, item) {
            var elem = $("<option>")
                .attr("value", ignore_slash(item.name))
                .text(item.name);
            $("[name=old-regulation]").append(elem.clone());
            $("[name=new-regulation]").append(elem.clone());
            rule_name_to_url[ignore_slash(item.name)] = item.url;
        });

        var on_regulation_change = function() {
            var old_name = $("[name=old-regulation] option:selected").text();
            var new_name = $("[name=new-regulation] option:selected").text();

            (function() {
                var old_url = rule_name_to_url[ignore_slash(old_name)];
                var new_url = rule_name_to_url[ignore_slash(new_name)];

                var old_a_tag = $("<a>").attr("href", old_url).text(old_name);
                var old_li_tag = $("<li>")
                    .addClass("list-group-item")
                    .append("旧レギュレーション：")
                    .append(old_a_tag);

                var new_a_tag = $("<a>").attr("href", new_url).text(new_name);
                var new_li_tag = $("<li>")
                    .addClass("list-group-item")
                    .append("新レギュレーション：")
                    .append(new_a_tag);

                var wiki_urls = $("#wiki-url");
                wiki_urls.empty();
                wiki_urls.append(new_li_tag).append(old_li_tag);
            })();

            (function() {
                var old_limit = data["limits"][ignore_slash(old_name)];
                var new_limit = data["limits"][ignore_slash(new_name)];

                var extend_cards = function(elem, names, label) {
                    $.each(names, function(index, name) {
                        var li_tag = $("<li>").addClass("list-group-item");
                        if (label) {
                            var span_tag = $("<span>").addClass(label[0]).text(label[1]);
                            li_tag.append(span_tag).append(" ");
                        }
                        li_tag.append(name);
                        elem.append(li_tag);
                    });
                };

                var labels = ["label label-danger", "label label-warning", "label label-info", "label label-success"];
                var old_limit_all = _.union(old_limit["forbidden"], old_limit["one"], old_limit["two"]);
                var new_limit_all = _.union(new_limit["forbidden"], new_limit["one"], new_limit["two"]);

                var forbidden_ul_tag = $("#forbidden");
                forbidden_ul_tag.empty();
                extend_cards(
                    forbidden_ul_tag,
                    _.intersection(old_limit["one"], new_limit["forbidden"]),
                    [labels[0], "制限 > 禁止"]);
                extend_cards(
                    forbidden_ul_tag,
                    _.intersection(old_limit["two"], new_limit["forbidden"]),
                    [labels[0], "準制限 > 禁止"]);
                extend_cards(
                    forbidden_ul_tag,
                    _.difference(new_limit["forbidden"], old_limit_all),
                    [labels[0], "無制限 > 禁止"]);
                extend_cards(
                    forbidden_ul_tag,
                    _.intersection(old_limit["forbidden"], new_limit["forbidden"]),
                    false);

                var one_ul_tag = $("#one");
                one_ul_tag.empty();
                extend_cards(
                    one_ul_tag,
                    _.intersection(old_limit["forbidden"], new_limit["one"]),
                    [labels[3], "禁止 > 制限"]);
                extend_cards(
                    one_ul_tag,
                    _.intersection(old_limit["two"], new_limit["one"]),
                    [labels[1], "準制限 > 制限"]);
                extend_cards(
                    one_ul_tag,
                    _.difference(new_limit["one"], old_limit_all),
                    [labels[1], "無制限 > 制限"]);
                extend_cards(
                    one_ul_tag,
                    _.intersection(old_limit["one"], new_limit["one"]),
                    false);

                var two_ul_tag = $("#two");
                two_ul_tag.empty();
                extend_cards(
                    two_ul_tag,
                    _.intersection(old_limit["forbidden"], new_limit["two"]),
                    [labels[3], "禁止 > 準制限"]);
                extend_cards(
                    two_ul_tag,
                    _.intersection(old_limit["one"], new_limit["two"]),
                    [labels[3], "制限 > 準制限"]);
                extend_cards(
                    two_ul_tag,
                    _.difference(new_limit["two"], old_limit_all),
                    [labels[2], "無制限 > 準制限"]);
                extend_cards(
                    two_ul_tag,
                    _.intersection(old_limit["two"], new_limit["two"]),
                    false);

                var free_ul_tag = $("#free");
                free_ul_tag.empty();
                extend_cards(
                    free_ul_tag,
                    _.difference(old_limit["forbidden"], new_limit_all),
                    [labels[3], "禁止 > 制限解除"]);
                extend_cards(
                    free_ul_tag,
                    _.difference(old_limit["one"], new_limit_all),
                    [labels[3], "制限 > 制限解除"]);
                extend_cards(
                    free_ul_tag,
                    _.difference(old_limit["two"], new_limit_all),
                    [labels[3], "準制限 > 制限解除"]);
            })();
        };

        $("[name=old-regulation]").on("change", on_regulation_change);
        $("[name=new-regulation]").on("change", on_regulation_change);

        $("[name=old-regulation] option:nth-child(2)").prop('selected', true);
        $("[name=new-regulation] option:nth-child(1)").prop('selected', true);

        on_regulation_change();
    });
});
