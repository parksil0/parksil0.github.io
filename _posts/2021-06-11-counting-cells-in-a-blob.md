---
layout: post
title: "Counting Cells in a Blob"
subtitle: "순환을 사용하여 알고리즘을 풀어봅니다."
date: 2021-06-11 23:17:00 +0800
---

- 문제 설명
    - Binary 이미지
    - 각 픽셀은 background pixel이거나 혹은 image pixel
    - 서로 연결된 image pixel들의 집합을 blob라고 부름
    - 상하좌우 및 대각방향으로도 연결된 것으로 간주

- 입력 :
    - N * N 크기의 2차원 그리드(grid)
    - 하나의 좌표 (x, y)\
- 출력 :
    - 픽셀 (x, y)가 포함된 blob의 크기,
    - (x, y)가 어떤 blob에도 속하지 않는 경우에는 0

- Recursive Thinking

    현재 픽셀이 image color가 아니라면 0을 반환한다.

    현재 픽셀이 image color라면, 먼저 현재 픽셀을 카운트한다 (count=1). 

    현재 픽셀이 중복 카운트되는 것을 방지하기 위해 다른색으로 칠한다. 

    현재 픽셀에 이웃한 모든 픽셀들에 대해서 그 픽셀이 속한 blob의 크기를 카운트하여 카운터에 더해준다. 카운터를 반환한다.

- sudo code

    Algorithm for countCells(x, y)

    ```java
    if the fixel(x,y) is outside the grid
    	the result is 0;
    else if fixel(x,y) is not an image pixel or already counted
    	the return is 0;
    else
    	set the colour of the pixel(x,y) th a red colour;
    	the result is 1 plus the number of cells in each piece of 
    	the blob that includes a nearest neighbour;

    ```

- java code

    ```java
    private static int BACKGROUND_COLOR = 0;
    private static int IMAGE_COLOR = 1;
    private static int ALREADY_COUNTED = 2;

    public int countCells(int x, int y) {
    	if(x<0 || x>=N || y<0 || y>=N)
    		return 0;
    	else if(grid[x][y] != IMAGE_COLOR)
    		return 0;
    	else {
    		grid[x][y] = ALREADY_COUNTED;
    		return 1 + countCells(x-1, y+1) + countCells(x, y+1)
    			+ countCells(x+1, y+1) + countCells(x-1, y)
    			+ countCells(x+1, y) + countCells(x-1, y-1)
    			+ countCells(x, y-1) + countCells(x+1, y-1);
    	}
    }
    ```