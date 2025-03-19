{ pkgs, ... }: {
  packages = [
    pkgs.nodejs
    pkgs.postgresql
  ];
  idx = {
    extensions = [
      "dbaeumer.vscode-eslint"
      "esbenp.prettier-vscode"
    ];
    workspace = {
      onCreate = {
        init = ''
          npm install
          initdb --pgdata=$HOME/pgdata --username=postgres
        '';
      };
      onStart = {
        start = ''
          pg_ctl -D $HOME/pgdata start
          npm run dev
        '';
      };
    };
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}
