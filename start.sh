if command -v node 2>/dev/null;
    then
        echo "Found node"
    else
        echo "Node not found. Please install it and try again"
        exit 1
fi

if command -v npm 2>/dev/null;
    then
        echo "Found npm"
    else
        echo "npm not found. Please install it and try again"
        exit 2
fi

echo "Updating npm packages"
npm i

npm start