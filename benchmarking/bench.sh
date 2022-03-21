echo "-------------------------------------"
echo "Running basic benchmarking"
echo "-------------------------------------"
npx artillery run --environment=basic --output=basic.json artillery.yml
npx artillery report basic.json
open basic.json.html

echo "-------------------------------------"
echo "Running benchmarking with fastify"
echo "-------------------------------------"
npx artillery run --environment=with-fastify --output with-fastify.json artillery.yml
npx artillery report with-fastify.json
open with-fastify.json.html

echo "-------------------------------------"
echo "Running benchmarking with jit"
echo "-------------------------------------"
npx artillery run --environment=with-jit --output with-jit.json artillery.yml
npx artillery report with-jit.json
open with-jit.json.html

echo "-------------------------------------"
echo "Running benchmarking with fastify and jit"
echo "-------------------------------------"
npx artillery run --environment=with-fastify-and-jit --output with-fastify-and-jit.json artillery.yml
npx artillery report with-fastify-and-jit.json
open with-fastify-and-jit.json.html
