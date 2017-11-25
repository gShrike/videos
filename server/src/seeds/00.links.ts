import * as Knex from "knex";

exports.seed = function (knex: Knex): Promise<any> {
    return knex.raw('DELETE FROM link; ALTER SEQUENCE link_id_seq RESTART WITH 3;')
        .then(function () {
            return knex("link").insert([
              { 
                id: 1, 
                title: "Live stream: express routes with Brooks",
                url: "https://www.youtube.com/watch?v=jJFd05_CjUY" 
              },
              { 
                id: 2, 
                title: "Frontend Face-Off - React/Redux with Brooks Patton",
                url: "https://www.youtube.com/watch?v=YSFIP0HsR7I" 
              },
            ]);
        });
};
