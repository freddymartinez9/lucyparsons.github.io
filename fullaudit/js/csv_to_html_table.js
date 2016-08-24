function init_table(options) {

    options = options || {};
    var csv_path = options.csv_path || "";
    var el = options.element || "table-container";
    var allow_download = options.allow_download || false;
    var csv_options = options.csv_options || {};
    var datatables_options = options.datatables_options || {};

    $("#" + el).html("<table class='table table-striped table-condensed' id='my-table'></table>");

    $.when($.get(csv_path)).then(
        function(data) {
            var csv_data = $.csv.toArrays(data, csv_options);

            var table_head = "<thead><tr>";

            for (head_id = 0; head_id < csv_data[0].length; head_id++) {
                table_head += "<th>" + csv_data[0][head_id] + "</th>";
            }

            table_head += "</tr></thead>";
            $('#my-table').append(table_head);
            $('#my-table').append("<tbody></tbody>");

            for (row_id = 1; row_id < csv_data.length; row_id++) {
                var row_html = "<tr>";

                for (col_id = 0; col_id < csv_data[row_id].length; col_id++) {
                    row_html += "<td>" + csv_data[row_id][col_id] + "</td>";
                }
		row_html= Linkify(row_html);
                row_html += "</tr>";
                $('#my-table tbody').append(row_html);
            }

            $("#my-table").DataTable(datatables_options);

            if (allow_download)
                $("#" + el).append("<p><a class='btn btn-info' href='" + csv_path + "'><i class='glyphicon glyphicon-download'></i> Download as CSV</a></p>");
        });
}

function Linkify(inputText) {
    //URLs starting with http://, https://, or ftp://
    var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    var replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //return pdf file to http tag, example 14425.pdf
    //var replacePattern3 = /([0-9]{0,5})/gim;
    //var replacedText = replacedText.replace(replacePattern3, '<a href="https://github.com/lucyparsons/1505analysis/blob/master/singlepdfs/'+replacePattern3 +'.pdf></a>');

    return replacedText
}
