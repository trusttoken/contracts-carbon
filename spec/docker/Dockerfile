# TODO: Find / build ourselves solc for aarch64
FROM --platform=linux/amd64 ubuntu:20.04

RUN export DEBIAN_FRONTEND=noninteractive && \
    apt update && \
    apt -y upgrade && \
    apt -y install curl git && \
    rm -rf /var/cache/apt/lists

RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -

RUN curl -fsSL https://get.docker.com | sh -

RUN export DEBIAN_FRONTEND=noninteractive && \
    apt update && \
    apt -y install nodejs python3.9 python3-pip default-jre && \
    rm -rf /var/cache/apt/lists

RUN npm install -g pnpm@6.20.3

WORKDIR /root

ADD ./build/package-extracted-deps.json package.json
RUN pnpm install && rm package.json

ADD ./build/requirements-frozen.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

ADD spec/docker/setup.sh .
ADD .compiler.json .

RUN bash setup.sh

ADD contracts contracts
ADD spec spec
ADD package.json .

ENTRYPOINT [ "certoraRun" ]
